
// ============================================================
// database/db.js — SQLite Setup & Table Creation
// Uses better-sqlite3 (synchronous, no callback hell)
// ============================================================

const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

// Ensure the database directory exists
const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create/open the SQLite database file
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "chatbot.db");
const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON"); // Enforce foreign key relationships

// ============================================================
// INITIALIZE DATABASE — Create all tables if they don't exist
// ============================================================
function initializeDatabase() {
  // --- USERS TABLE ---
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      username   TEXT NOT NULL UNIQUE,
      email      TEXT NOT NULL UNIQUE,
      password   TEXT NOT NULL,
      role       TEXT NOT NULL DEFAULT 'user',   -- 'user' or 'admin'
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // --- SESSIONS TABLE ---
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER NOT NULL,
      title      TEXT NOT NULL DEFAULT 'New Chat',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // --- CHATS TABLE ---
  // Stores every message exchanged between user and AI
  db.exec(`
    CREATE TABLE IF NOT EXISTS chats (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER NOT NULL,
      session_id INTEGER,                -- which session this belongs to
      message    TEXT NOT NULL,          -- what the user sent
      response   TEXT NOT NULL,          -- what AI replied
      response_json TEXT,                -- optional structured response (JSON)
      source     TEXT DEFAULT 'ai',      -- 'ai' or 'faq'
      file_path  TEXT,                   -- path to uploaded file (if any)
      timestamp  TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE SET NULL
    );
  `);

  // Add session_id to existing chats table if upgrading from old schema
  try {
    db.exec(`ALTER TABLE chats ADD COLUMN session_id INTEGER REFERENCES sessions(id) ON DELETE SET NULL`);
  } catch (e) { /* Column already exists — safe to ignore */ }

  // Add response_json if upgrading from old schema
  try {
    db.exec(`ALTER TABLE chats ADD COLUMN response_json TEXT`);
  } catch (e) { /* Column already exists — safe to ignore */ }

  // --- USER PREFERENCES TABLE ---
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_preferences (
      user_id    INTEGER PRIMARY KEY,
      theme      TEXT NOT NULL DEFAULT 'dark', -- 'dark' | 'light'
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // --- WATCHLIST TABLE ---
  db.exec(`
    CREATE TABLE IF NOT EXISTS watchlist (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id      INTEGER NOT NULL,
      tmdb_id      INTEGER NOT NULL,
      media_type   TEXT NOT NULL, -- 'movie' | 'tv'
      title        TEXT NOT NULL,
      poster_path  TEXT,
      list_type    TEXT NOT NULL DEFAULT 'favorites', -- 'favorites' | 'watch_later'
      added_at     TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, tmdb_id, media_type),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // --- FAQ TABLE ---
  // Pre-loaded answers that bypass AI (faster + cheaper)
  db.exec(`
    CREATE TABLE IF NOT EXISTS faqs (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      question   TEXT NOT NULL,
      answer     TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // --- Seed some starter FAQs ---
  const faqCount = db.prepare("SELECT COUNT(*) as count FROM faqs").get();
  if (faqCount.count === 0) {
    const insertFaq = db.prepare(
      "INSERT INTO faqs (question, answer) VALUES (?, ?)"
    );
    const seedFaqs = [
      [
        "What is the Hybrid ISP Approach?",
        "The Hybrid ISP (Information Systems Planning) Approach combines top-down strategic planning (from management) with bottom-up operational insights (from IT and customer service teams). This ensures business goals align with practical system requirements."
      ],
      [
        "How does the AI chatbot work?",
        "Our AI chatbot uses Google Gemini to process your questions. It first checks our FAQ database for quick answers. If no match is found, it sends your question to the AI for a detailed, intelligent response."
      ],
      [
        "What are the business goals of this system?",
        "The main business goals are: reduce customer response time, improve customer satisfaction, lower operational costs by automating repetitive queries, and provide 24/7 support availability."
      ],
      [
        "How is my data protected?",
        "All passwords are hashed using bcrypt. Authentication uses JWT tokens. API keys are stored securely in environment variables, never in the frontend code."
      ],
      [
        "Can I upload files to the chatbot?",
        "Yes! You can upload images, PDFs, and text files. The backend processes them — images are sent to Gemini Vision AI, and text/PDF content is extracted and used as context for the AI response."
      ]
    ];
    seedFaqs.forEach(([q, a]) => insertFaq.run(q, a));
    console.log("📚 Seeded starter FAQs into database.");
  }

  // --- Seed Admin User ---
  const adminExists = db.prepare("SELECT id FROM users WHERE email = ?").get("admin@gmail.com");
  if (!adminExists) {
    const bcrypt = require("bcryptjs");
    const hashedPassword = bcrypt.hashSync("admin123", 12);
    db.prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)").run(
      "admin",
      "admin@gmail.com",
      hashedPassword,
      "admin"
    );
    console.log("🔐 Default admin user created (admin@gmail.com / admin123)");
  }

  // Ensure admin1 is also an admin if it exists
  db.prepare("UPDATE users SET role = 'admin' WHERE email = ?").run("admin1@gmail.com");

  console.log(`💾 Database initialized at: ${DB_PATH}`);
}

// Export both the db instance and the init function
module.exports = { db, initializeDatabase };
