// ============================================================
// routes/tmdb.routes.js — TMDB Proxy Routes (optional)
// Keeps TMDB credentials on the server.
// ============================================================

const express = require("express");
const router = express.Router();

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function getTmdbAuthHeaders() {
  const token = (process.env.TMDB_ACCESS_TOKEN || "").trim().replace(/;+$/, "");
  if (!token) return null;
  return { Authorization: `Bearer ${token}`, accept: "application/json" };
}

async function proxy(req, res) {
  try {
    const headers = getTmdbAuthHeaders();
    const apiKey = (process.env.TMDB_API_KEY || "").trim().replace(/;+$/, "");
    if (!headers && !apiKey) {
      return res.status(500).json({ error: "TMDB credentials missing in server .env. Set TMDB_ACCESS_TOKEN (v4) or TMDB_API_KEY (v3)." });
    }

    const path = req.query.path;
    if (!path || typeof path !== "string" || !path.startsWith("/")) {
      return res.status(400).json({ error: "Query param 'path' must be a TMDB path starting with '/'." });
    }

    const join = path.includes("?") ? "&" : "?";
    const url = headers ? `${TMDB_BASE_URL}${path}` : `${TMDB_BASE_URL}${path}${join}api_key=${apiKey}`;
    const response = await fetch(url, headers ? { headers } : undefined);
    const data = await response.json().catch(() => ({}));
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to proxy TMDB request.", detail: err.message });
  }
}

// GET /api/tmdb?path=/trending/all/day
router.get("/", proxy);

module.exports = router;

