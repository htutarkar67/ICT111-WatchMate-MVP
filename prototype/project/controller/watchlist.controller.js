// ============================================================
// controllers/watchlist.controller.js — Watchlist Management
// ============================================================

const { db } = require("../database/db");
const logger = require("../middleware/logger");

// POST /api/watchlist — Add movie/show to watchlist
function addToWatchlist(req, res) {
  try {
    const { tmdb_id, media_type, title, poster_path, list_type } = req.body;
    const user_id = req.user.id;

    if (!tmdb_id || !media_type || !title) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (!["movie", "tv"].includes(media_type)) {
      return res.status(400).json({ error: "Invalid media_type." });
    }

    if (!["favorites", "watch_later"].includes(list_type)) {
      return res.status(400).json({ error: "Invalid list_type." });
    }

    // Check if already in watchlist
    const existing = db
      .prepare("SELECT id FROM watchlist WHERE user_id = ? AND tmdb_id = ? AND media_type = ?")
      .get(user_id, tmdb_id, media_type);

    if (existing) {
      // Update list_type if already exists
      db
        .prepare("UPDATE watchlist SET list_type = ? WHERE user_id = ? AND tmdb_id = ? AND media_type = ?")
        .run(list_type, user_id, tmdb_id, media_type);
      return res.status(200).json({ message: "Watchlist updated." });
    }

    // Insert into watchlist
    db
      .prepare(
        "INSERT INTO watchlist (user_id, tmdb_id, media_type, title, poster_path, list_type) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .run(user_id, tmdb_id, media_type, title, poster_path, list_type);

    logger.info(`User ${user_id} added ${media_type} ${tmdb_id} to ${list_type}`);
    return res.status(201).json({ message: "Added to watchlist." });
  } catch (err) {
    logger.error(`Watchlist add error: ${err.message}`);
    return res.status(500).json({ error: "Failed to add to watchlist." });
  }
}

// GET /api/watchlist — Get user's watchlist (with optional filter)
function getWatchlist(req, res) {
  try {
    const user_id = req.user.id;
    const list_type = req.query.list_type; // 'favorites' or 'watch_later' (optional)

    let query = "SELECT * FROM watchlist WHERE user_id = ?";
    const params = [user_id];

    if (list_type && ["favorites", "watch_later"].includes(list_type)) {
      query += " AND list_type = ?";
      params.push(list_type);
    }

    query += " ORDER BY added_at DESC";

    const items = db.prepare(query).all(...params);
    return res.status(200).json({ items });
  } catch (err) {
    logger.error(`Watchlist get error: ${err.message}`);
    return res.status(500).json({ error: "Failed to retrieve watchlist." });
  }
}

// DELETE /api/watchlist/:id — Remove from watchlist
function removeFromWatchlist(req, res) {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    const item = db.prepare("SELECT id FROM watchlist WHERE id = ? AND user_id = ?").get(id, user_id);

    if (!item) {
      return res.status(404).json({ error: "Item not found in watchlist." });
    }

    db.prepare("DELETE FROM watchlist WHERE id = ?").run(id);

    logger.info(`User ${user_id} removed item ${id} from watchlist`);
    return res.status(200).json({ message: "Removed from watchlist." });
  } catch (err) {
    logger.error(`Watchlist remove error: ${err.message}`);
    return res.status(500).json({ error: "Failed to remove from watchlist." });
  }
}

// DELETE /api/watchlist/by-tmdb/:tmdb_id/:media_type — Remove by TMDB ID
function removeByTmdbId(req, res) {
  try {
    const user_id = req.user.id;
    const { tmdb_id, media_type } = req.params;

    const item = db
      .prepare("SELECT id FROM watchlist WHERE user_id = ? AND tmdb_id = ? AND media_type = ?")
      .get(user_id, tmdb_id, media_type);

    if (!item) {
      return res.status(404).json({ error: "Item not found in watchlist." });
    }

    db
      .prepare("DELETE FROM watchlist WHERE user_id = ? AND tmdb_id = ? AND media_type = ?")
      .run(user_id, tmdb_id, media_type);

    logger.info(`User ${user_id} removed ${media_type} ${tmdb_id} from watchlist`);
    return res.status(200).json({ message: "Removed from watchlist." });
  } catch (err) {
    logger.error(`Watchlist remove by tmdb error: ${err.message}`);
    return res.status(500).json({ error: "Failed to remove from watchlist." });
  }
}

// GET /api/watchlist/check/:tmdb_id/:media_type — Check if item is in watchlist
function checkInWatchlist(req, res) {
  try {
    const user_id = req.user.id;
    const { tmdb_id, media_type } = req.params;

    const item = db
      .prepare("SELECT id, list_type FROM watchlist WHERE user_id = ? AND tmdb_id = ? AND media_type = ?")
      .get(user_id, tmdb_id, media_type);

    return res.status(200).json({
      inWatchlist: !!item,
      listType: item?.list_type || null,
    });
  } catch (err) {
    logger.error(`Watchlist check error: ${err.message}`);
    return res.status(500).json({ error: "Failed to check watchlist." });
  }
}

module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
  removeByTmdbId,
  checkInWatchlist,
};
