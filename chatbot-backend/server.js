/**
 * Tarik Services — AI Chatbot Backend Server
 *
 * Handles chat conversations via OpenAI, with server-side session
 * management, rate limiting, and CORS.
 *
 * Endpoints:
 *   POST /api/chat          — Send a message and get AI response
 *   POST /api/chat/init     — Initialize a new session (optional greeting)
 *   GET  /api/chat/history   — Get conversation history for a session
 *   DELETE /api/chat/session — Delete a session
 *   GET  /health             — Health check
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');
const { generateChatResponse } = require('./lib/openaiService');
const sessionStore = require('./lib/sessionStore');

// ─── Config ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3700;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGINS = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map(s => s.trim());

// ─── Express App ────────────────────────────────────────────────────
const app = express();

// ─── Middleware ──────────────────────────────────────────────────────

// CORS
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (CORS_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Session-Id'],
  credentials: true,
}));

// JSON body parser
app.use(express.json({ limit: '1mb' }));

// Rate limiting — per IP
const chatLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60000,
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 30,
  message: { error: 'Too many requests. Please wait a moment before sending another message.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use X-Forwarded-For for proxied requests, fallback to IP
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
  },
});

// Request logger
app.use((req, res, next) => {
  if (req.method !== 'OPTIONS') {
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: true });
    console.log(`📨 [${timestamp}] ${req.method} ${req.path}`);
  }
  next();
});

// ─── Helper: Get or Create Session ID ───────────────────────────────
function getSessionId(req) {
  return req.headers['x-session-id'] || req.body?.sessionId || null;
}

// ─── Health Check ───────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Tarik Chatbot Backend',
    activeSessions: sessionStore.activeCount,
    uptime: Math.floor(process.uptime()) + 's',
    environment: NODE_ENV,
  });
});

// ─── POST /api/chat — Main chat endpoint ────────────────────────────
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Message is required and must be a non-empty string.',
      });
    }

    // Get or create session
    let sessionId = getSessionId(req);
    if (!sessionId) {
      sessionId = uuidv4();
    }

    console.log(`💬 Session: ${sessionId.substring(0, 8)}... | Message: "${message.substring(0, 80)}${message.length > 80 ? '...' : ''}"`);

    // Generate AI response
    const { reply } = await generateChatResponse(sessionId, message.trim());

    console.log(`✅ Reply: "${reply.substring(0, 80)}${reply.length > 80 ? '...' : ''}"`);

    res.json({
      reply,
      sessionId,
    });

  } catch (error) {
    console.error('❌ Chat Error:', error.message);
    res.status(500).json({
      error: error.message || 'Something went wrong. Please try again.',
    });
  }
});

// ─── POST /api/chat/init — Initialize session with greeting ─────────
app.post('/api/chat/init', chatLimiter, async (req, res) => {
  try {
    const sessionId = uuidv4();

    // Optionally include a pre-set greeting from the assistant
    const greeting = 'Hey! 🎉 Accha laga aapko yahan dekh ke. Aap sahi jagah aaye ho — hum aapke business ke liye bilkul perfect website bana sakte hain. Pehle ye batao, aapka naam kya hai?';

    // Store assistant greeting in session
    sessionStore.addMessage(sessionId, 'assistant', greeting);

    console.log(`🆕 New session initialized: ${sessionId.substring(0, 8)}...`);

    res.json({
      sessionId,
      greeting,
    });

  } catch (error) {
    console.error('❌ Init Error:', error.message);
    res.status(500).json({
      error: 'Failed to initialize chat session.',
    });
  }
});

// ─── GET /api/chat/history — Get conversation history ───────────────
app.get('/api/chat/history', (req, res) => {
  const sessionId = getSessionId(req);

  if (!sessionId) {
    return res.status(400).json({ error: 'X-Session-Id header is required.' });
  }

  if (!sessionStore.has(sessionId)) {
    return res.status(404).json({ error: 'Session not found.' });
  }

  const messages = sessionStore.getMessages(sessionId);

  res.json({
    sessionId,
    messages,
    messageCount: messages.length,
  });
});

// ─── DELETE /api/chat/session — Delete a session ────────────────────
app.delete('/api/chat/session', (req, res) => {
  const sessionId = getSessionId(req);

  if (!sessionId) {
    return res.status(400).json({ error: 'X-Session-Id header is required.' });
  }

  sessionStore.delete(sessionId);
  console.log(`🗑️ Session deleted: ${sessionId.substring(0, 8)}...`);

  res.json({ success: true, message: 'Session deleted.' });
});

// ─── 404 Handler ────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Global Error Handler ───────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('💥 Unhandled Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║                                                      ║
║   💬 Tarik AI Chatbot Backend                        ║
║   ──────────────────────                             ║
║   Server:     http://localhost:${PORT}                 ║
║   Environment: ${NODE_ENV.padEnd(16)}                  ║
║                                                      ║
║   Endpoints:                                         ║
║     POST   /api/chat          — Send message         ║
║     POST   /api/chat/init     — New session          ║
║     GET    /api/chat/history  — Get history          ║
║     DELETE /api/chat/session  — Delete session       ║
║     GET    /health            — Health check          ║
║                                                      ║
║   CORS: ${CORS_ORIGINS[0].padEnd(33)}       ║
║   Rate Limit: ${process.env.RATE_LIMIT_MAX || 30} req/min per IP                  ║
║                                                      ║
║   Powered by OpenAI (${process.env.OPENAI_MODEL || 'gpt-4o-mini'})                  ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
  `);
});

// ─── Graceful Shutdown ──────────────────────────────────────────────
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down chatbot backend...');
  sessionStore.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down chatbot backend...');
  sessionStore.destroy();
  process.exit(0);
});
