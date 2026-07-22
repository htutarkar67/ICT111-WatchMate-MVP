// ============================================================
// controllers/chat.controller.js — Core Chat Logic
//
// Flow for each message:
// 1. Receive user message (+ optional file)
// 2. Check FAQ database for matching answer
// 3. If FAQ match → return FAQ answer (no AI call)
// 4. If no match → call Groq AI (via OpenAI-compatible SDK)
// 5. Save conversation to database
// 6. Return response to frontend
// ============================================================

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { db } = require("../database/db");
const logger = require("../middleware/logger");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const GEMINI_MODEL = "gemini-flash-latest"; // Verified working alias

// ============================================================
// SYSTEM PROMPT — Tells AI how to behave
// ============================================================
const SYSTEM_PROMPT = `You are an AI Support Assistant for a company using the Hybrid ISP (Information Systems Planning) Approach. 
Your role is to help users understand:
- How the AI-powered FAQ chatbot system works
- The Hybrid ISP Approach (top-down + bottom-up planning)
- Business goals, system architecture, and implementation details
- General customer support inquiries

Keep responses clear, professional, and concise. 
If asked about something outside your knowledge, say so honestly.`;

// ============================================================
// FAQ MATCHER — Smart keyword matching
// ============================================================
function findFaqMatch(userQuestion) {
  const faqs = db.prepare("SELECT * FROM faqs").all();
  const questionLower = userQuestion.toLowerCase().trim();

  for (const faq of faqs) {
    const faqLower = faq.question.toLowerCase();
    const faqWords = faqLower.split(/\s+/).filter(w => w.length > 3);
    const questionWords = questionLower.split(/\s+/).filter(w => w.length > 3);
    const matchCount = faqWords.filter(word => questionWords.includes(word)).length;
    const matchRatio = matchCount / Math.max(faqWords.length, 1);
    if (matchRatio >= 0.4 && matchCount >= 2) {
      return faq;
    }
  }
  return null;
}

// ============================================================
// SESSION MANAGEMENT
// ============================================================

// POST /api/chat/sessions — Create a new session
function createSession(req, res) {
  try {
    const userId = req.user.id;
    const title = req.body.title || "New Chat";
    const result = db.prepare(
      "INSERT INTO sessions (user_id, title) VALUES (?, ?)"
    ).run(userId, title);

    const session = db.prepare("SELECT * FROM sessions WHERE id = ?").get(result.lastInsertRowid);
    return res.status(201).json({ session });
  } catch (err) {
    logger.error(`Create session error: ${err.message}`);
    return res.status(500).json({ error: "Failed to create session." });
  }
}

// GET /api/chat/sessions — Get all sessions for the user
function getSessions(req, res) {
  try {
    const userId = req.user.id;
    const sessions = db.prepare(
      `SELECT s.*, 
        (SELECT message FROM chats WHERE session_id = s.id ORDER BY timestamp DESC LIMIT 1) as last_message,
        (SELECT COUNT(*) FROM chats WHERE session_id = s.id) as message_count
       FROM sessions s
       WHERE s.user_id = ?
       ORDER BY s.created_at DESC`
    ).all(userId);
    return res.status(200).json({ sessions });
  } catch (err) {
    logger.error(`Get sessions error: ${err.message}`);
    return res.status(500).json({ error: "Failed to retrieve sessions." });
  }
}

// GET /api/chat/sessions/:id — Get chats for a specific session
function getSessionChats(req, res) {
  try {
    const userId = req.user.id;
    const sessionId = req.params.id;

    // Verify session belongs to user
    const session = db.prepare(
      "SELECT * FROM sessions WHERE id = ? AND user_id = ?"
    ).get(sessionId, userId);

    if (!session) {
      return res.status(404).json({ error: "Session not found." });
    }

    const chats = db.prepare(
      `SELECT id, message, response, source, file_path, timestamp
       FROM chats
       WHERE session_id = ? AND user_id = ?
       ORDER BY timestamp ASC`
    ).all(sessionId, userId);

    return res.status(200).json({ session, chats });
  } catch (err) {
    logger.error(`Get session chats error: ${err.message}`);
    return res.status(500).json({ error: "Failed to retrieve session chats." });
  }
}

// DELETE /api/chat/sessions/:id — Delete a session and its chats
function deleteSession(req, res) {
  try {
    const userId = req.user.id;
    const sessionId = req.params.id;

    const session = db.prepare(
      "SELECT * FROM sessions WHERE id = ? AND user_id = ?"
    ).get(sessionId, userId);

    if (!session) {
      return res.status(404).json({ error: "Session not found." });
    }

    db.prepare("DELETE FROM chats WHERE session_id = ?").run(sessionId);
    db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId);
    return res.status(200).json({ message: "Session deleted." });
  } catch (err) {
    logger.error(`Delete session error: ${err.message}`);
    return res.status(500).json({ error: "Failed to delete session." });
  }
}

// ============================================================
// SEND MESSAGE — POST /api/chat
// ============================================================
async function sendMessage(req, res) {
  try {
    const { message, session_id } = req.body;
    const userId = req.user.id;
    const uploadedFile = req.file;

    if (!message && !uploadedFile) {
      return res.status(400).json({ error: "Message or file is required." });
    }

    // Auto-create a session if none provided
    let sessionId = session_id ? parseInt(session_id) : null;
    if (!sessionId) {
      const firstWords = message ? message.substring(0, 40) : "File Upload";
      const result = db.prepare(
        "INSERT INTO sessions (user_id, title) VALUES (?, ?)"
      ).run(userId, firstWords);
      sessionId = result.lastInsertRowid;
    }

    let aiResponse = "";
    let source = "ai";
    let filePath = uploadedFile ? uploadedFile.path : null;

    // --- STEP 1: Check FAQ ---
    if (message) {
      const faqMatch = findFaqMatch(message);
      if (faqMatch) {
        aiResponse = `📚 **FAQ Answer:**\n\n${faqMatch.answer}`;
        source = "faq";
        logger.info(`FAQ match found for user ${userId}: "${message}"`);
      }
    }

    // --- STEP 2: Call AI if no FAQ match ---
    if (!aiResponse) {
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
        systemInstruction: SYSTEM_PROMPT
      });

      let promptParts = [message || "Please analyze the attached file."];

      if (uploadedFile) {
        const mimeType = uploadedFile.mimetype;
        if (mimeType.startsWith("image/")) {
          promptParts.push({
            inlineData: {
              data: fs.readFileSync(uploadedFile.path).toString("base64"),
              mimeType
            }
          });
        } else if (mimeType === "application/pdf") {
          const pdfBuffer = fs.readFileSync(uploadedFile.path);
          const pdfData = await pdfParse(pdfBuffer);
          promptParts[0] += "\n\n[Attached PDF Content]:\n" + pdfData.text.substring(0, 3000);
        } else if (mimeType === "text/plain") {
          const textContent = fs.readFileSync(uploadedFile.path, "utf-8").substring(0, 3000);
          promptParts[0] += "\n\n[Attached Text File]:\n" + textContent;
        }
      }

      const result = await model.generateContent(promptParts);
      aiResponse = result.response.text();
      logger.info(`AI response generated for user ${userId}`);
    }

    // --- STEP 3: Save to Database ---
    db.prepare(
      "INSERT INTO chats (user_id, session_id, message, response, source, file_path) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(userId, sessionId, message || "[File only]", aiResponse, source, filePath);

    // Update session title from first meaningful message if it was auto-created
    const msgCount = db.prepare("SELECT COUNT(*) as c FROM chats WHERE session_id = ?").get(sessionId).c;
    if (msgCount === 1 && message) {
      db.prepare("UPDATE sessions SET title = ? WHERE id = ?")
        .run(message.substring(0, 50), sessionId);
    }

    return res.status(200).json({
      response: aiResponse,
      source,
      session_id: sessionId
    });

  } catch (err) {
    logger.error(`Chat error: ${err.message}`);
    console.error("FULL GROQ ERROR:", err);

    if (err.status === 401 || (err.message && err.message.includes("API key"))) {
      return res.status(500).json({ error: "Invalid API key. Check your .env file." });
    }
    if (err.status === 429 || (err.message && err.message.includes("quota"))) {
      return res.status(429).json({ error: "AI quota exceeded. Try again later." });
    }
    if (err.status === 404 || (err.message && err.message.includes("model"))) {
      return res.status(500).json({ error: "AI model not found. Check model name in chat.controller.js." });
    }

    return res.status(500).json({
      error: "Failed to process your message. Please try again.",
      detail: err.message
    });
  }
}

// ============================================================
// GET CHAT HISTORY — GET /api/chat/history (legacy, no session)
// ============================================================
function getChatHistory(req, res) {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const chats = db
      .prepare(
        `SELECT id, message, response, source, file_path, timestamp
         FROM chats
         WHERE user_id = ?
         ORDER BY timestamp DESC
         LIMIT ? OFFSET ?`
      )
      .all(userId, limit, offset);

    const total = db
      .prepare("SELECT COUNT(*) as count FROM chats WHERE user_id = ?")
      .get(userId).count;

    return res.status(200).json({
      chats: chats.reverse(),
      total,
      limit,
      offset
    });

  } catch (err) {
    logger.error(`Chat history error: ${err.message}`);
    return res.status(500).json({ error: "Failed to retrieve chat history." });
  }
}

// ============================================================
// DELETE CHAT — DELETE /api/chat/:id
// ============================================================
function deleteChat(req, res) {
  try {
    const userId = req.user.id;
    const chatId = req.params.id;

    const chat = db
      .prepare("SELECT id FROM chats WHERE id = ? AND user_id = ?")
      .get(chatId, userId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }

    db.prepare("DELETE FROM chats WHERE id = ?").run(chatId);
    return res.status(200).json({ message: "Chat deleted." });

  } catch (err) {
    logger.error(`Delete chat error: ${err.message}`);
    return res.status(500).json({ error: "Failed to delete chat." });
  }
}

module.exports = { sendMessage, getChatHistory, deleteChat, createSession, getSessions, getSessionChats, deleteSession };
