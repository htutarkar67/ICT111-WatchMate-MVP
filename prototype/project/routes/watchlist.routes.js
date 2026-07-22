// ============================================================
// routes/watchlist.routes.js — User Watchlist Routes
// ============================================================

const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlist.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// All watchlist routes require authentication
router.use(verifyToken);

// Add to watchlist
router.post("/", watchlistController.addToWatchlist);

// Get watchlist (with optional list_type filter)
router.get("/", watchlistController.getWatchlist);

// Check if item is in watchlist
router.get("/check/:tmdb_id/:media_type", watchlistController.checkInWatchlist);

// Remove from watchlist by ID
router.delete("/:id", watchlistController.removeFromWatchlist);

// Remove by TMDB ID
router.delete("/by-tmdb/:tmdb_id/:media_type", watchlistController.removeByTmdbId);

module.exports = router;
