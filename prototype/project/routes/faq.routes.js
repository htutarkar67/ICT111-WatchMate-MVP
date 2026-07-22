// ============================================================
// routes/faq.routes.js — Public FAQ Routes
// GET /api/faq       — List all FAQs (public)
// GET /api/faq/:id   — Get one FAQ
// ============================================================

const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq.controller");

// Public: anyone can read FAQs
router.get("/", faqController.getAllFaqs);
router.get("/:id", faqController.getFaqById);

module.exports = router;
