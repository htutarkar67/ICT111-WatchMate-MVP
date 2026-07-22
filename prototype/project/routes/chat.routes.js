// ============================================================
// routes/chat.routes.js — Chat Routes
// POST /api/chat          — Send a message
// GET  /api/chat/history  — Get this user's chat history
// DELETE /api/chat/:id    — Delete a specific chat message
// ============================================================

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const chatController = require("../controllers/chat.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// --- Multer File Upload Config ---
// Files are saved to /uploads with a unique timestamped name
const uploadDir = process.env.UPLOAD_PATH || "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow: images, PDFs, and text files only
  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp",
    "application/pdf", "text/plain"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed. Only images, PDFs, and text files."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// All chat routes require authentication
router.use(verifyToken);

// Send a message (with optional file upload)
router.post("/", upload.single("file"), chatController.sendMessage);

// Get this user's full chat history
router.get("/history", chatController.getChatHistory);

// Session management
router.post("/sessions", chatController.createSession);
router.get("/sessions", chatController.getSessions);
router.get("/sessions/:id", chatController.getSessionChats);
router.delete("/sessions/:id", chatController.deleteSession);

// Delete a specific chat entry
router.delete("/:id", chatController.deleteChat);

module.exports = router;
