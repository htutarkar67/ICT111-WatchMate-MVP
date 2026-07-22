// ============================================================
// controllers/admin.controller.js — Admin Dashboard Logic
// ============================================================

const { db } = require("../database/db");
const logger = require("../middleware/logger");

// GET /api/admin/users — All registered users
function getAllUsers(req, res) {
  try {
    const users = db
      .prepare(
        "SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC"
      )
      .all();
    return res.status(200).json({ users, total: users.length });
  } catch (err) {
    logger.error(`Admin get users error: ${err.message}`);
    return res.status(500).json({ error: "Failed to retrieve users." });
  }
}

// DELETE /api/admin/users/:id — Delete a user (and all their chats)
function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ error: "You cannot delete your own account." });
    }

    const user = db.prepare("SELECT id FROM users WHERE id = ?").get(id);
    if (!user) return res.status(404).json({ error: "User not found." });

    // Cascading delete (chats are deleted automatically via FK)
    db.prepare("DELETE FROM users WHERE id = ?").run(id);

    logger.info(`Admin deleted user id=${id}`);
    return res.status(200).json({ message: "User deleted." });
  } catch (err) {
    logger.error(`Admin delete user error: ${err.message}`);
    return res.status(500).json({ error: "Failed to delete user." });
  }
}

// PUT /api/admin/users/:id/role — Change user role
function updateUserRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Role must be 'user' or 'admin'." });
    }

    const user = db.prepare("SELECT id FROM users WHERE id = ?").get(id);
    if (!user) return res.status(404).json({ error: "User not found." });

    db.prepare("UPDATE users SET role = ? WHERE id = ?").run(role, id);

    logger.info(`Admin updated user ${id} role to ${role}`);
    return res.status(200).json({ message: `User role updated to ${role}.` });
  } catch (err) {
    logger.error(`Admin update role error: ${err.message}`);
    return res.status(500).json({ error: "Failed to update role." });
  }
}

// GET /api/admin/chats — All chats across all users
function getAllChats(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;
    const userId = req.query.user_id; // Optional: filter by user

    let query = `
      SELECT c.id, c.user_id, c.message, c.response, c.source, c.timestamp,
             u.username, u.email
      FROM chats c
      JOIN users u ON c.user_id = u.id
    `;
    const params = [];

    if (userId) {
      query += " WHERE c.user_id = ?";
      params.push(userId);
    }

    query += " ORDER BY c.timestamp DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const chats = db.prepare(query).all(...params);
    const total = db
      .prepare(`SELECT COUNT(*) as count FROM chats${userId ? " WHERE user_id = ?" : ""}`)
      .get(...(userId ? [userId] : [])).count;

    return res.status(200).json({ chats, total });
  } catch (err) {
    logger.error(`Admin get chats error: ${err.message}`);
    return res.status(500).json({ error: "Failed to retrieve chats." });
  }
}

// DELETE /api/admin/chats/:id — Admin deletes any chat
function deleteChat(req, res) {
  try {
    const { id } = req.params;
    const chat = db.prepare("SELECT id FROM chats WHERE id = ?").get(id);
    if (!chat) return res.status(404).json({ error: "Chat not found." });

    db.prepare("DELETE FROM chats WHERE id = ?").run(id);
    logger.info(`Admin deleted chat id=${id}`);
    return res.status(200).json({ message: "Chat deleted." });
  } catch (err) {
    logger.error(`Admin delete chat error: ${err.message}`);
    return res.status(500).json({ error: "Failed to delete chat." });
  }
}

// GET /api/admin/stats — Dashboard summary numbers
function getStats(req, res) {
  try {
    const totalUsers = db.prepare("SELECT COUNT(*) as c FROM users").get().c;
    const totalChats = db.prepare("SELECT COUNT(*) as c FROM chats").get().c;
    const totalFaqs = db.prepare("SELECT COUNT(*) as c FROM faqs").get().c;
    const faqHits = db.prepare("SELECT COUNT(*) as c FROM chats WHERE source = 'faq'").get().c;
    const aiHits = db.prepare("SELECT COUNT(*) as c FROM chats WHERE source = 'ai'").get().c;

    // Recent activity (last 7 days)
    const recentChats = db
      .prepare(
        "SELECT COUNT(*) as c FROM chats WHERE timestamp >= datetime('now', '-7 days')"
      )
      .get().c;

    return res.status(200).json({
      stats: {
        totalUsers,
        totalChats,
        totalFaqs,
        faqHits,
        aiHits,
        recentChats,
        faqHitRate: totalChats > 0 ? Math.round((faqHits / totalChats) * 100) + "%" : "0%"
      }
    });
  } catch (err) {
    logger.error(`Admin stats error: ${err.message}`);
    return res.status(500).json({ error: "Failed to retrieve stats." });
  }
}

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllChats,
  deleteChat,
  getStats
};
