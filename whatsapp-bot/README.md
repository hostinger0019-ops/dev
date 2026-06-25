# 🤖 Tarik WhatsApp Bot

AI-powered WhatsApp Business automation for **Tarik Services** using Twilio + Cerebras AI.

When a customer messages your WhatsApp Business number, this bot automatically responds using the same AI that powers your website chatbot — but optimized for WhatsApp conversations.

---

## 🚀 Quick Start

### Step 1: Get Twilio Credentials

1. Sign up at [twilio.com](https://www.twilio.com) (free trial available)
2. Go to [Twilio Console](https://console.twilio.com)
3. Copy your **Account SID** and **Auth Token** from the dashboard

### Step 2: Activate WhatsApp Sandbox

1. In Twilio Console → **Messaging** → **Try it Out** → **Send a WhatsApp message**
2. Accept terms and activate the sandbox
3. You'll see a **Sandbox Number** and a **Join Code** (e.g., "join painted-river")
4. Send that join code from your personal WhatsApp to the sandbox number

### Step 3: Configure Environment

Edit the `.env` file and add your Twilio credentials:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
CEREBRAS_API_KEY=csk-your-existing-key
PORT=3600
```

### Step 4: Install & Run

```bash
cd whatsapp-bot
npm install
npm start
```

You should see:
```
🤖 Tarik WhatsApp Bot
Server:    http://localhost:3600
Webhook:   POST /webhook
Health:    GET  /health
```

### Step 5: Expose with ngrok (for local testing)

In a **separate terminal**:

```bash
ngrok http 3600
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok-free.app`)

### Step 6: Configure Twilio Webhook

1. Go to Twilio Console → **Messaging** → **Try it Out** → **WhatsApp Sandbox Settings**
2. In **"When a message comes in"**, paste:
   ```
   https://your-ngrok-url.ngrok-free.app/webhook
   ```
3. Set method to **HTTP POST**
4. Click **Save**

### Step 7: Test It! 🎉

Send a WhatsApp message to the sandbox number. You should get an AI-powered response!

---

## 📁 Project Structure

```
whatsapp-bot/
├── .env                          # Credentials (never commit this!)
├── package.json                  # Dependencies
├── server.js                     # Express server + Twilio webhook
├── lib/
│   ├── cerebras.js              # AI response generation
│   └── conversationStore.js     # Conversation memory per user
└── README.md                    # This file
```

---

## 🛠️ Features

| Feature | Description |
|---|---|
| **AI Responses** | Powered by Cerebras AI (same LLM as website chatbot) |
| **Conversation Memory** | Remembers context per user (last 20 messages) |
| **Auto-Expiry** | Clears inactive conversations after 1 hour |
| **Media Handling** | Gracefully handles images/docs with a text-only message |
| **RESET Command** | Users can type "RESET" to clear conversation |
| **Health Check** | `GET /health` for monitoring |
| **Request Logging** | Detailed console logs for debugging |
| **Security** | Twilio signature validation (enable in production) |

---

## 🔐 Production Checklist

Before going live:

- [ ] Set `VALIDATE_TWILIO_SIGNATURE=true` in `.env`
- [ ] Deploy to a cloud server (Render, Railway, VPS, or Hostinger)
- [ ] Register a production WhatsApp Business number (not sandbox)
- [ ] Complete Meta Business verification
- [ ] Set up message templates for business-initiated messages
- [ ] Consider upgrading conversation store to Redis/MongoDB for persistence

---

## 📞 API Endpoints

### `POST /webhook`
Twilio sends incoming WhatsApp messages here. Responds with TwiML.

### `GET /health`
Returns server status:
```json
{
  "status": "ok",
  "service": "Tarik WhatsApp Bot",
  "activeConversations": 3,
  "uptime": "1234s"
}
```

---

## 🧪 Testing Without WhatsApp

You can test the webhook locally with curl:

```bash
curl -X POST http://localhost:3600/webhook \
  -d "Body=Hello" \
  -d "From=whatsapp:+919876543210" \
  -d "ProfileName=Test User" \
  -d "NumMedia=0"
```

---

## 💡 Tips

- The bot uses `llama-4-scout-17b-16e-instruct` model via Cerebras for fast inference
- WhatsApp has a 24-hour customer service window — respond within that window for free
- To send messages outside the window, you need pre-approved Meta templates
- The bot is designed to qualify leads and guide them toward booking a call
