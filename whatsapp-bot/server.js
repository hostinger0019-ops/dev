/**
 * Tarik Services — WhatsApp Business Automation Server
 * 
 * Receives incoming WhatsApp messages via Twilio webhooks,
 * processes them through Cerebras AI, and sends intelligent responses.
 * 
 * Endpoints:
 *   POST /webhook  — Twilio incoming message webhook
 *   GET  /health   — Health check
 */

require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const { generateResponse } = require('./lib/cerebras');
const conversationStore = require('./lib/conversationStore');

// ─── Config ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3600;
const VALIDATE_SIGNATURE = process.env.VALIDATE_TWILIO_SIGNATURE === 'true';

// ─── Express App ────────────────────────────────────────────────────
const app = express();

// Twilio sends webhooks as URL-encoded form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ─── Request Logger Middleware ──────────────────────────────────────
app.use((req, res, next) => {
  if (req.method === 'POST') {
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: true });
    console.log(`\n📨 [${timestamp}] Incoming ${req.method} ${req.path}`);
  }
  next();
});

// ─── Twilio Signature Validation Middleware ──────────────────────────
function validateTwilioRequest(req, res, next) {
  if (!VALIDATE_SIGNATURE) {
    return next(); // Skip validation in development
  }

  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioSignature = req.headers['x-twilio-signature'] || '';
  
  // Build the full URL that Twilio used to call us
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  const isValid = twilio.validateRequest(
    authToken,
    twilioSignature,
    url,
    req.body
  );

  if (!isValid) {
    console.warn('⚠️  Invalid Twilio signature — request rejected');
    return res.status(403).send('Forbidden');
  }

  next();
}

// ─── Health Check ───────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Tarik WhatsApp Bot',
    activeConversations: conversationStore.activeCount,
    uptime: Math.floor(process.uptime()) + 's',
  });
});

// ─── Twilio WhatsApp Webhook ────────────────────────────────────────
app.post('/webhook', validateTwilioRequest, async (req, res) => {
  try {
    // Extract message data from Twilio's webhook payload
    const incomingMessage = req.body.Body || '';
    const senderPhone = req.body.From || '';        // e.g., "whatsapp:+919876543210"
    const senderName = req.body.ProfileName || 'Unknown';
    const numMedia = parseInt(req.body.NumMedia || '0', 10);

    // Clean phone number (remove "whatsapp:" prefix for storage)
    const phoneKey = senderPhone.replace('whatsapp:', '');

    console.log(`👤 From: ${senderName} (${phoneKey})`);
    console.log(`💬 Message: "${incomingMessage}"`);

    // Handle media messages (images, docs, etc.)
    if (numMedia > 0 && !incomingMessage.trim()) {
      const twiml = new twilio.twiml.MessagingResponse();
      twiml.message("Thanks for sharing! 📎 I can only process text messages right now. How can I help you today? 😊");
      return res.type('text/xml').send(twiml.toString());
    }

    // Handle empty messages
    if (!incomingMessage.trim()) {
      const twiml = new twilio.twiml.MessagingResponse();
      twiml.message("Hey! 👋 Send me a message and I'll be happy to help you out!");
      return res.type('text/xml').send(twiml.toString());
    }

    // Generate AI response
    console.log('🤖 Generating AI response...');
    const aiResponse = await generateResponse(phoneKey, incomingMessage);
    console.log(`✅ AI Response: "${aiResponse.substring(0, 100)}${aiResponse.length > 100 ? '...' : ''}"`);

    // Build TwiML response
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(aiResponse);

    res.type('text/xml').send(twiml.toString());
  } catch (error) {
    console.error('❌ Webhook Error:', error);

    // Always respond to Twilio — otherwise it will retry
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message("Sorry, something went wrong on our end! 😔 Please try again in a moment.");
    res.type('text/xml').send(twiml.toString());
  }
});

// ─── 404 Handler ────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Start Server ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║                                                      ║
║   🤖 Tarik WhatsApp Bot                             ║
║   ────────────────────                               ║
║   Server:    http://localhost:${PORT}                  ║
║   Webhook:   POST /webhook                           ║
║   Health:    GET  /health                            ║
║   Twilio:    Signature validation ${VALIDATE_SIGNATURE ? 'ON ✅' : 'OFF ⚠️'}            ║
║                                                      ║
║   Powered by Cerebras AI + Twilio                    ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
  `);
});

// ─── Graceful Shutdown ──────────────────────────────────────────────
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  conversationStore.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  conversationStore.destroy();
  process.exit(0);
});
