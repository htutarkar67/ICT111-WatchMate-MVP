// ============================================================
// routes/admin.routes.js — Admin-Only Routes
// ALL routes here require: verifyToken + requireAdmin
// ============================================================

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const faqController = require("../controllers/faq.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { requireAdmin } = require("../middleware/admin.middleware");

// Apply auth guards to ALL admin routes
router.use(verifyToken);
router.use(requireAdmin);

// --- User Management ---
router.get("/users", adminController.getAllUsers);
router.delete("/users/:id", adminController.deleteUser);
router.put("/users/:id/role", adminController.updateUserRole);

// --- Chat History (all users) ---
router.get("/chats", adminController.getAllChats);
router.delete("/chats/:id", adminController.deleteChat);

// --- FAQ Management (CRUD) ---
router.post("/faq", faqController.createFaq);
router.put("/faq/:id", faqController.updateFaq);
router.delete("/faq/:id", faqController.deleteFaq);

// --- Stats Dashboard ---
router.get("/stats", adminController.getStats);

module.exports = router;
