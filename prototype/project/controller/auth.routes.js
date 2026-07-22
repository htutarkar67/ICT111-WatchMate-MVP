// ============================================================
// routes/auth.routes.js — Authentication Routes
// POST /api/auth/register
// POST /api/auth/login
// GET  /api/auth/me  (get current user info)
// ============================================================

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Register a new user
router.post("/register", authController.register);

// Login with email + password
router.post("/login", authController.login);

// OAuth (Google)
router.post("/google", authController.googleLogin);

// Get current logged-in user's info (requires token)
router.get("/me", verifyToken, authController.getMe);

// Preferences (theme, etc)
router.get("/preferences", verifyToken, authController.getPreferences);
router.put("/preferences", verifyToken, authController.updatePreferences);

module.exports = router;
