/**
 * OpenAI Service — Handles communication with the OpenAI Chat Completions API
 */

const OpenAI = require('openai');
const SYSTEM_PROMPT = require('./systemPrompt');
const sessionStore = require('./sessionStore');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const MAX_TOKENS = 500;
const TEMPERATURE = 0.7;

// Limit conversation history sent to API to avoid token overflow
const MAX_HISTORY_MESSAGES = 40;

/**
 * Generate an AI response for a chat session.
 *
 * @param {string} sessionId  — Unique session identifier
 * @param {string} userMessage — The user's latest message
 * @returns {Promise<{ reply: string, sessionId: string }>}
 */
async function generateChatResponse(sessionId, userMessage) {
  // Store user message
  sessionStore.addMessage(sessionId, 'user', userMessage);

  // Build messages array for OpenAI
  const history = sessionStore.getMessages(sessionId);

  // Trim to last N messages if conversation is very long
  const trimmedHistory = history.length > MAX_HISTORY_MESSAGES
    ? history.slice(-MAX_HISTORY_MESSAGES)
    : history;

  const apiMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...trimmedHistory,
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: apiMessages,
      max_completion_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
    });

    const reply = completion.choices?.[0]?.message?.content
      || 'Sorry, I couldn\'t process that. Please try again!';

    // Store assistant reply
    sessionStore.addMessage(sessionId, 'assistant', reply);

    // Log token usage for monitoring
    if (completion.usage) {
      console.log(`📊 Tokens — prompt: ${completion.usage.prompt_tokens}, completion: ${completion.usage.completion_tokens}, total: ${completion.usage.total_tokens}`);
    }

    return { reply, sessionId };

  } catch (error) {
    console.error('❌ OpenAI API Error:', error.message);

    // Specific error handling
    if (error.status === 429) {
      throw new Error('Rate limited by OpenAI. Please try again in a moment.');
    }
    if (error.status === 401) {
      throw new Error('Invalid OpenAI API key. Please check your configuration.');
    }
    if (error.status === 503) {
      throw new Error('OpenAI service is temporarily unavailable. Please try again.');
    }

    throw new Error('Failed to generate response. Please try again.');
  }
}

module.exports = { generateChatResponse };
