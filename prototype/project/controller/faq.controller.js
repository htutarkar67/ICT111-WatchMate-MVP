// ============================================================
// controllers/faq.controller.js — FAQ CRUD Operations
// Public: read FAQs
// Admin-only: create, update, delete FAQs
// ============================================================

const { db } = require("../database/db");
const logger = require("../middleware/logger");

// GET /api/faq — List all FAQs
function getAllFaqs(req, res) {
  try {
    const faqs = db
      .prepare("SELECT * FROM faqs ORDER BY created_at DESC")
      .all();
    return res.status(200).json({ faqs });
  } catch (err) {
    logger.error(`Get FAQs error: ${err.message}`);
    return res.status(500).json({ error: "Failed to retrieve FAQs." });
  }
}

// GET /api/faq/:id — Get one FAQ
function getFaqById(req, res) {
  try {
    const faq = db
      .prepare("SELECT * FROM faqs WHERE id = ?")
      .get(req.params.id);

    if (!faq) return res.status(404).json({ error: "FAQ not found." });

    return res.status(200).json({ faq });
  } catch (err) {
    logger.error(`Get FAQ error: ${err.message}`);
    return res.status(500).json({ error: "Failed to retrieve FAQ." });
  }
}

// POST /api/admin/faq — Create new FAQ (admin only)
function createFaq(req, res) {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "Question and answer are required." });
    }
    if (question.trim().length < 5) {
      return res.status(400).json({ error: "Question too short." });
    }

    const result = db
      .prepare("INSERT INTO faqs (question, answer) VALUES (?, ?)")
      .run(question.trim(), answer.trim());

    const newFaq = db
      .prepare("SELECT * FROM faqs WHERE id = ?")
      .get(result.lastInsertRowid);

    logger.info(`Admin created FAQ id=${result.lastInsertRowid}`);
    return res.status(201).json({ message: "FAQ created.", faq: newFaq });
  } catch (err) {
    logger.error(`Create FAQ error: ${err.message}`);
    return res.status(500).json({ error: "Failed to create FAQ." });
  }
}

// PUT /api/admin/faq/:id — Update FAQ (admin only)
function updateFaq(req, res) {
  try {
    const { question, answer } = req.body;
    const { id } = req.params;

    const existing = db.prepare("SELECT id FROM faqs WHERE id = ?").get(id);
    if (!existing) return res.status(404).json({ error: "FAQ not found." });

    if (!question || !answer) {
      return res.status(400).json({ error: "Question and answer are required." });
    }

    db.prepare(
      "UPDATE faqs SET question = ?, answer = ?, updated_at = datetime('now') WHERE id = ?"
    ).run(question.trim(), answer.trim(), id);

    const updated = db.prepare("SELECT * FROM faqs WHERE id = ?").get(id);

    logger.info(`Admin updated FAQ id=${id}`);
    return res.status(200).json({ message: "FAQ updated.", faq: updated });
  } catch (err) {
    logger.error(`Update FAQ error: ${err.message}`);
    return res.status(500).json({ error: "Failed to update FAQ." });
  }
}

// DELETE /api/admin/faq/:id — Delete FAQ (admin only)
function deleteFaq(req, res) {
  try {
    const { id } = req.params;

    const existing = db.prepare("SELECT id FROM faqs WHERE id = ?").get(id);
    if (!existing) return res.status(404).json({ error: "FAQ not found." });

    db.prepare("DELETE FROM faqs WHERE id = ?").run(id);

    logger.info(`Admin deleted FAQ id=${id}`);
    return res.status(200).json({ message: "FAQ deleted." });
  } catch (err) {
    logger.error(`Delete FAQ error: ${err.message}`);
    return res.status(500).json({ error: "Failed to delete FAQ." });
  }
}

module.exports = { getAllFaqs, getFaqById, createFaq, updateFaq, deleteFaq };
