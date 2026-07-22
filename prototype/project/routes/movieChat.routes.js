// ============================================================
// routes/movieChat.routes.js — Movie Recommendation Chat Routes
// ============================================================

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const movieChat = require("../controllers/movieChat.controller");

// all routes require auth
router.use(verifyToken);

router.post("/", movieChat.sendMessage);

router.post("/sessions", movieChat.createSession);
router.get("/sessions", movieChat.getSessions);
router.get("/sessions/:id", movieChat.getSessionChats);
router.delete("/sessions/:id", movieChat.deleteSession);

module.exports = router;

