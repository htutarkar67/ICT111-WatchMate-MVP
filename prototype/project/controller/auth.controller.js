// ============================================================
// controllers/auth.controller.js — Register, Login, Me
// ============================================================

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../database/db");
const logger = require("../middleware/logger");
const { OAuth2Client } = require("google-auth-library");

const googleClient = process.env.GOOGLE_CLIENT_ID ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID) : null;

/**
 * Generate a signed JWT token for a user
 */
function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

// ============================================================
// REGISTER — POST /api/auth/register
// ============================================================
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // --- Input Validation ---
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ error: "Username must be 3–30 characters." });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    // --- Check for existing user ---
    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ? OR username = ?")
      .get(email, username);

    if (existingUser) {
      return res.status(409).json({ error: "Email or username already taken." });
    }

    // --- Hash Password ---
    // Salt rounds = 12 (higher = more secure but slower)
    const hashedPassword = await bcrypt.hash(password, 12);

    // --- Insert into DB ---
    const result = db
      .prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)")
      .run(username, email.toLowerCase(), hashedPassword, "user");

    const newUser = {
      id: result.lastInsertRowid,
      username,
      email: email.toLowerCase(),
      role: "user"
    };

    const token = generateToken(newUser);

    logger.info(`New user registered: ${username} (${email})`);

    // Create default preferences row
    try {
      db.prepare("INSERT OR IGNORE INTO user_preferences (user_id, theme) VALUES (?, ?)").run(newUser.id, "dark");
    } catch (e) { /* ignore */ }

    return res.status(201).json({
      message: "Registration successful!",
      token,
      user: { id: newUser.id, username, email: newUser.email, role: "user" }
    });

  } catch (err) {
    logger.error(`Register error: ${err.message}`);
    return res.status(500).json({ error: "Server error during registration." });
  }
}

// ============================================================
// LOGIN — POST /api/auth/login
// ============================================================
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Find user by email or username
    const user = db
      .prepare("SELECT * FROM users WHERE email = ? OR username = ?")
      .get(email.toLowerCase(), email); // Check both lowercased email and raw input for username

    if (!user) {
      // Don't reveal whether email exists (security best practice)
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Compare password with hashed version in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = generateToken(user);

    logger.info(`User logged in: ${user.username} (${user.email})`);

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    return res.status(500).json({ error: "Server error during login." });
  }
}

// ============================================================
// GET ME — GET /api/auth/me
// Returns the currently logged-in user's info
// ============================================================
function getMe(req, res) {
  try {
    // req.user is set by verifyToken middleware
    const prefs = db
      .prepare("SELECT theme FROM user_preferences WHERE user_id = ?")
      .get(req.user.id);
    return res.status(200).json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
        theme: prefs?.theme || "dark"
      }
    });
  } catch (err) {
    logger.error(`GetMe error: ${err.message}`);
    return res.status(500).json({ error: "Server error." });
  }
}

// ============================================================
// GOOGLE LOGIN — POST /api/auth/google
// Body: { credential: <google id_token> }
// ============================================================
async function googleLogin(req, res) {
  try {
    if (!googleClient) {
      return res.status(500).json({ error: "Google sign-in not configured. Set GOOGLE_CLIENT_ID in server .env." });
    }
    const { credential } = req.body || {};
    if (!credential) {
      return res.status(400).json({ error: "Missing Google credential." });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload?.email;
    const name = payload?.name || payload?.given_name || "user";

    if (!email) {
      return res.status(400).json({ error: "Google account has no email." });
    }

    // Find existing user
    let user = db.prepare("SELECT id, username, email, role FROM users WHERE email = ?").get(email.toLowerCase());
    if (!user) {
      // Create user with random password (not used for Google login)
      const baseUsername = String(name).toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 18) || "user";
      let username = baseUsername;
      // ensure unique username
      for (let i = 0; i < 10; i++) {
        const exists = db.prepare("SELECT id FROM users WHERE username = ?").get(username);
        if (!exists) break;
        username = `${baseUsername}${Math.floor(Math.random() * 10000)}`;
      }

      const hashedPassword = await bcrypt.hash(jwt.sign({ t: Date.now() }, process.env.JWT_SECRET), 12);
      const result = db
        .prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)")
        .run(username, email.toLowerCase(), hashedPassword, "user");

      user = { id: result.lastInsertRowid, username, email: email.toLowerCase(), role: "user" };
      db.prepare("INSERT OR IGNORE INTO user_preferences (user_id, theme) VALUES (?, ?)").run(user.id, "dark");
      logger.info(`New user created via Google: ${username} (${email})`);
    }

    const token = generateToken(user);
    return res.status(200).json({ message: "Google login successful!", token, user });
  } catch (err) {
    logger.error(`Google login error: ${err.message}`);
    return res.status(500).json({ error: "Google login failed." });
  }
}

// ============================================================
// USER PREFERENCES — GET/PUT /api/auth/preferences
// ============================================================
function getPreferences(req, res) {
  try {
    const row = db.prepare("SELECT theme, updated_at FROM user_preferences WHERE user_id = ?").get(req.user.id);
    return res.status(200).json({ preferences: row || { theme: "dark" } });
  } catch (err) {
    logger.error(`GetPreferences error: ${err.message}`);
    return res.status(500).json({ error: "Failed to load preferences." });
  }
}

function updatePreferences(req, res) {
  try {
    const { theme } = req.body;
    if (theme && !["dark", "light"].includes(theme)) {
      return res.status(400).json({ error: "Theme must be 'dark' or 'light'." });
    }
    const current = db.prepare("SELECT user_id FROM user_preferences WHERE user_id = ?").get(req.user.id);
    if (!current) {
      db.prepare("INSERT INTO user_preferences (user_id, theme) VALUES (?, ?)").run(req.user.id, theme || "dark");
    } else if (theme) {
      db.prepare("UPDATE user_preferences SET theme = ?, updated_at = datetime('now') WHERE user_id = ?").run(theme, req.user.id);
    }
    const updated = db.prepare("SELECT theme, updated_at FROM user_preferences WHERE user_id = ?").get(req.user.id);
    return res.status(200).json({ preferences: updated });
  } catch (err) {
    logger.error(`UpdatePreferences error: ${err.message}`);
    return res.status(500).json({ error: "Failed to update preferences." });
  }
}

module.exports = { register, login, getMe, googleLogin, getPreferences, updatePreferences };
