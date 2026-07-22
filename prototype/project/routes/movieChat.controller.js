const { db } = require("../database/db");
const logger = require("../middleware/logger");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// --- TMDB Helpers ---
function getTmdbHeaders() {
  const token = (process.env.TMDB_ACCESS_TOKEN || "").trim();
  return token ? { Authorization: `Bearer ${token}`, accept: "application/json" } : null;
}

async function tmdbFetch(path) {
  const headers = getTmdbHeaders();
  const apiKey = (process.env.TMDB_API_KEY || "").trim();
  const join = path.includes("?") ? "&" : "?";
  const url = headers ? `${TMDB_BASE_URL}${path}` : `${TMDB_BASE_URL}${path}${join}api_key=${apiKey}`;
  const response = await fetch(url, headers ? { headers } : undefined);
  if (!response.ok) throw new Error(`TMDB Error: ${response.status}`);
  return response.json();
}

async function tmdbResults(path) {
  try {
    const data = await tmdbFetch(path);
    return data.results || [];
  } catch (e) { return []; }
}

async function getGenreMap() {
  try {
    const [m, t] = await Promise.all([tmdbFetch("/genre/movie/list"), tmdbFetch("/genre/tv/list")]);
    const map = {};
    [...(m.genres || []), ...(t.genres || [])].forEach(g => map[g.name.toLowerCase()] = g.id);
    return map;
  } catch (e) { return {}; }
}

// ── Enrich raw items for the frontend ──────────────────────
async function enrichItems(rawItems) {
  const genreMap = await getGenreMap();
  const idToName = {};
  for (const [name, id] of Object.entries(genreMap)) idToName[id] = name;

  return rawItems.filter(item => item && (item.title || item.name)).map(item => {
    const media_type = item.media_type || (item.first_air_date ? "tv" : "movie");
    const release_date = item.release_date || item.first_air_date || "";

    return {
      ...item,
      media_type,
      title: item.title || item.name,
      poster_path: item.poster_path,
      release_date: release_date,
      rating: item.vote_average ? Math.round(item.vote_average * 10) / 10 : null,
      genres: (item.genre_ids || []).map(id => idToName[id]).filter(Boolean)
        .map(g => g.charAt(0).toUpperCase() + g.slice(1))
    };
  });
}

// --- AI Intent Parsing ---
async function parseIntent(message) {
  if (!genAI) return null;
  // Using the models confirmed to work in test-gemini.js
  const models = ["gemini-flash-latest", "gemini-2.0-flash", "gemini-1.5-flash"];

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const prompt = `You are "W2W", a premium movie expert. Analyze the user's mood and request.
User request: "${message}"
Return ONLY a JSON object:
{
  "reply": "A warm, helpful response (about 2-3 sentences) that sounds like a real movie expert. Be conversational and unique each time.",
  "action": "similar" | "discover" | "search",
  "subject": "the core movie/TV title mentioned",
  "filters": { "genres": ["drama", etc], "year": "YYYY", "mediaType": "movie" | "tv", "language": "iso-code" }
}`;
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim().replace(/```json|```/g, "").trim();
      return JSON.parse(text);
    } catch (e) {
      logger.error(`Gemini (${modelName}) failed: ${e.message}`);
      continue;
    }
  }
  return null;
}

// --- Dynamic Smart Reply (When AI is down) ---
function generateSmartReply(message, count) {
  const msg = message.toLowerCase();
  if (count === 0) return "I'm having a little trouble finding those specific titles. Could you try a different year or category?";

  let type = "titles";
  if (/k[- ]?drama|korean/.test(msg)) type = "K-Dramas";
  else if (msg.includes("anime") || msg.includes("japanese")) type = "Japanese titles";
  else if (msg.includes("us") || msg.includes("english") || msg.includes("hollywood")) type = "Western titles";
  else if (msg.includes("series") || msg.includes("show")) type = "TV series";
  else if (msg.includes("movie")) type = "movies";

  const yearMatch = msg.match(/\b(19|20)\d{2}\b/);
  const yearPart = yearMatch ? ` from ${yearMatch[0]}` : "";

  const variations = [
    `Great choice! I've found some amazing ${type}${yearPart} for you.`,
    `Searching the database for the best ${type}${yearPart}... here's what I found!`,
    `If you love ${type}${yearPart}, you should definitely check these out!`,
    `Here are some top-rated ${type}${yearPart} that match your request.`
  ];

  return variations[Math.floor(Math.random() * variations.length)];
}

// --- Core Logic ---
async function buildRecommendations(message) {
  const genreMap = await getGenreMap();
  const ai = await parseIntent(message);
  const promptLower = message.toLowerCase();

  let raw = [];
  let reply = "";

  // 1. Path via AI (if working)
  if (ai) {
    reply = ai.reply;
    const { action, subject, filters } = ai;

    if (action === "similar" && subject) {
      const search = await tmdbFetch(`/search/multi?query=${encodeURIComponent(subject)}`);
      const top = (search.results || []).find(x => x.media_type === "movie" || x.media_type === "tv");
      if (top) {
        raw = await tmdbResults(`/${top.media_type}/${top.id}/similar`);
        raw = raw.map(x => ({ ...x, media_type: top.media_type }));
      }
    }

    if (raw.length === 0 && (action === "discover" || filters)) {
      const type = filters?.mediaType === "tv" ? "tv" : "movie";
      const gIds = (filters?.genres || []).map(g => genreMap[g.toLowerCase()]).filter(Boolean);
      let url = `/discover/${type}?sort_by=popularity.desc&vote_count.gte=20`;
      if (gIds.length > 0) url += `&with_genres=${gIds.join(",")}`;
      if (filters?.language) url += `&with_original_language=${filters.language}`;
      if (filters?.year) url += type === "tv" ? `&first_air_date_year=${filters.year}` : `&primary_release_year=${filters.year}`;
      raw = (await tmdbResults(url)).map(x => ({ ...x, media_type: type }));
    }
  }

  // 2. Path via Advanced Safety Rules (AI Fallback)
  if (raw.length === 0) {
    // Determine Media Type
    const isTV = /series|show|tv|kdrama|k-drama/.test(promptLower);
    const mediaType = isTV ? "tv" : "movie";

    // Determine Language
    let lang = null;
    if (/k[- ]?drama|korean/.test(promptLower)) lang = "ko";
    else if (promptLower.includes("anime") || promptLower.includes("japanese")) lang = "ja";
    else if (/us|english|hollywood|american/.test(promptLower)) lang = "en";
    else if (promptLower.includes("bollywood") || promptLower.includes("hindi") || promptLower.includes("indian")) lang = "hi";

    // Determine Year
    const yearMatch = promptLower.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? yearMatch[0] : null;

    // Determine Genres
    const gIds = Object.keys(genreMap).filter(g => promptLower.includes(g)).map(g => genreMap[g]);

    // Build specialized discover query
    let endpoint = `/discover/${mediaType}?sort_by=vote_average.desc&vote_count.gte=100`;
    if (gIds.length > 0) endpoint += `&with_genres=${gIds.join(",")}`;
    if (lang) endpoint += `&with_original_language=${lang}`;
    if (year) endpoint += isTV ? `&first_air_date_year=${year}` : `&primary_release_year=${year}`;

    raw = (await tmdbResults(endpoint)).map(x => ({ ...x, media_type: mediaType }));

    // Ultimate fallback: Keyword search
    if (raw.length === 0) {
      const cleanQuery = promptLower.replace(/recommend|best|show me|find me|please|movie|series|show/g, "").trim();
      const s = await tmdbFetch(`/search/multi?query=${encodeURIComponent(cleanQuery || message)}`);
      raw = (s.results || []).filter(x => x.media_type === "movie" || x.media_type === "tv");
    }
  }

  const enriched = await enrichItems(raw);
  const formatted = enriched.slice(0, 6);
  const finalReply = reply || generateSmartReply(message, formatted.length);

  return { reply: finalReply, recommendations: formatted };
}

// --- Controllers ---
async function sendMessage(req, res) {
  try {
    const { message, session_id } = req.body;
    const userId = req.user.id;
    if (!message) return res.status(400).json({ error: "Message required" });

    let sessionId = session_id ? parseInt(session_id) : null;
    if (!sessionId) {
      const r = db.prepare("INSERT INTO sessions (user_id, title) VALUES (?, ?)").run(userId, message.slice(0, 50));
      sessionId = r.lastInsertRowid;
    }

    const { reply, recommendations } = await buildRecommendations(message);
    db.prepare("INSERT INTO chats (user_id, session_id, message, response, response_json, source) VALUES (?, ?, ?, ?, ?, ?)")
      .run(userId, sessionId, message, reply, JSON.stringify({ recommendations }), "movie");

    res.status(200).json({ reply, recommendations, session_id: sessionId });
  } catch (err) {
    logger.error(`Chat error: ${err.message}`);
    res.status(500).json({ error: "Server Error" });
  }
}

function createSession(req, res) {
  const r = db.prepare("INSERT INTO sessions (user_id, title) VALUES (?, ?)").run(req.user.id, req.body.title || "New Chat");
  res.status(201).json({ session: db.prepare("SELECT * FROM sessions WHERE id = ?").get(r.lastInsertRowid) });
}

function getSessions(req, res) {
  const s = db.prepare(`SELECT s.*, (SELECT message FROM chats WHERE session_id = s.id ORDER BY timestamp DESC LIMIT 1) as last_message, (SELECT COUNT(*) FROM chats WHERE session_id = s.id) as message_count FROM sessions s WHERE s.user_id = ? ORDER BY s.created_at DESC`).all(req.user.id);
  res.status(200).json({ sessions: s.filter(x => x.message_count > 0) });
}

function getSessionChats(req, res) {
  const s = db.prepare("SELECT * FROM sessions WHERE id = ? AND user_id = ?").get(req.params.id, req.user.id);
  if (!s) return res.status(404).json({ error: "Not found" });
  res.status(200).json({ session: s, chats: db.prepare("SELECT * FROM chats WHERE session_id = ? ORDER BY timestamp ASC").all(req.params.id) });
}

function deleteSession(req, res) {
  db.prepare("DELETE FROM chats WHERE session_id = ?").run(req.params.id);
  db.prepare("DELETE FROM sessions WHERE id = ?").run(req.params.id);
  res.status(200).json({ message: "Deleted" });
}

module.exports = { createSession, getSessions, getSessionChats, deleteSession, sendMessage };
