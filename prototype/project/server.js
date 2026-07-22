// ============================================================
// server.js — Main Entry Point
// This is the heart of the backend. It sets up Express,
// connects all routes, and starts listening for requests.
// ============================================================

require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const { initializeDatabase } = require("./database/db");
const logger = require("./middleware/logger");

// --- Import Routes ---
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const faqRoutes = require("./routes/faq.routes");
const adminRoutes = require("./routes/admin.routes");
const tmdbRoutes = require("./routes/tmdb.routes");
const movieChatRoutes = require("./routes/movieChat.routes");
const watchlistRoutes = require("./routes/watchlist.routes");
// --- Create Express App ---
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// MIDDLEWARE SETUP
// These run on every request before hitting the routes
// ============================================================

// Allow frontend to talk to backend (CORS)
app.use(cors({
  origin: "*", // In production, set this to your domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Log every incoming request (using winston)
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} — IP: ${req.ip}`);
  next();
});

// Trust proxy if you're behind one (like a local dev server or load balancer)
app.set("trust proxy", 1);

// ============================================================
// RATE LIMITING — Protect against spam/brute force
// ============================================================

// General rate limit: 500 requests per 15 minutes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: { error: "Too many requests, please try again later." }
});

// Strict rate limit for auth routes: 50 per 15 min
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: "Too many login attempts, please try again later." }
});

// Chat rate limit: 30 messages per minute
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "You're sending messages too fast. Slow down!" }
});

// ============================================================
// SERVE STATIC FRONTEND FILES
// Your HTML/CSS/JS frontend is served from the /public folder
// ============================================================
app.use(express.static(path.join(__dirname, "public")));

// Apply general rate limit to everything ELSE (API and catch-all)
app.use(generalLimiter);


// ============================================================
// API ROUTES
// All API endpoints start with /api/
// ============================================================
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/chat", chatLimiter, chatRoutes);
app.use("/api/movie-chat", chatLimiter, movieChatRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tmdb", tmdbRoutes);
app.use("/api/watchlist", watchlistRoutes);
// Serve uploaded files (publicly accessible by URL)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================================================
// CATCH-ALL ROUTE
// Any unknown route returns the frontend index.html
// (Enables frontend routing if you use one)
// ============================================================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ============================================================
// GLOBAL ERROR HANDLER
// Catches any unhandled errors and returns clean JSON
// ============================================================
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({
    error: "Something went wrong on the server.",
    details: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ============================================================
// START SERVER
// First initialize the database, then start listening
// ============================================================
initializeDatabase(); // Creates tables if they don't exist

app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from /public`);
  console.log(`🔐 JWT Auth: enabled`);
  console.log(`🤖 AI Provider: Google Gemini`);
  console.log(`💾 Database: SQLite (${process.env.DB_PATH || "./database/chatbot.db"})\n`);
});
