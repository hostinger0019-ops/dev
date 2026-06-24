# Tarik AI Chatbot Backend

Express.js backend server for the Tarik Services AI chatbot. Handles OpenAI conversations server-side with session management, rate limiting, and CORS.

## Why a Backend?

The frontend currently calls OpenAI directly from the browser, which:
- ❌ Exposes the API key in browser devtools
- ❌ Exposes the full system prompt (your sales strategy) to visitors
- ❌ No rate limiting — anyone can spam the API at your expense

This backend fixes all of that.

## Quick Start

```bash
cd chatbot-backend
npm install
npm run dev
```

Server starts at **http://localhost:3700**

## API Endpoints

### `POST /api/chat` — Send a message
```json
// Request
{
  "message": "Website ki pricing batao",
  "sessionId": "optional-existing-session-id"
}

// Response
{
  "reply": "Hey! Smart move looking into this...",
  "sessionId": "generated-uuid"
}
```

You can also pass `sessionId` via the `X-Session-Id` header.

### `POST /api/chat/init` — Start a new session
```json
// Response
{
  "sessionId": "new-uuid",
  "greeting": "Hey! 🎉 Accha laga aapko yahan dekh ke..."
}
```

### `GET /api/chat/history` — Get conversation history
```
Header: X-Session-Id: your-session-id
```
```json
// Response
{
  "sessionId": "...",
  "messages": [
    { "role": "assistant", "content": "Hey! 🎉..." },
    { "role": "user", "content": "Hi..." }
  ],
  "messageCount": 2
}
```

### `DELETE /api/chat/session` — Delete a session
```
Header: X-Session-Id: your-session-id
```

### `GET /health` — Health check
```json
{
  "status": "ok",
  "service": "Tarik Chatbot Backend",
  "activeSessions": 3,
  "uptime": "120s"
}
```

## Frontend Integration

Update `ChatBot.jsx` to use this backend instead of calling OpenAI directly:

```jsx
const API_URL = 'http://localhost:3700/api/chat'; // dev
// const API_URL = 'https://your-server.com/api/chat'; // prod

const sendMessage = async (text) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Id': sessionId,
    },
    body: JSON.stringify({ message: text }),
  });
  const data = await res.json();
  // data.reply = AI response
  // data.sessionId = session ID to reuse
};
```

## Project Structure

```
chatbot-backend/
├── server.js              # Express server + routes
├── lib/
│   ├── openaiService.js   # OpenAI API communication
│   ├── sessionStore.js    # In-memory session management
│   └── systemPrompt.js    # Sales agent system prompt
├── .env                   # Environment variables
├── .env.example           # Template for env vars
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | — |
| `OPENAI_MODEL` | Model to use | `gpt-4o-mini` |
| `PORT` | Server port | `3700` |
| `CORS_ORIGINS` | Comma-separated allowed origins | `http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `60000` (1 min) |
| `RATE_LIMIT_MAX` | Max requests per window per IP | `30` |
| `SESSION_TTL_MS` | Session inactivity timeout | `1800000` (30 min) |
