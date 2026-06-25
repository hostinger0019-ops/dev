/**
 * Cerebras AI Module
 * 
 * Handles AI response generation using the Cerebras Cloud SDK.
 * Maintains conversation context per user for multi-turn WhatsApp chats.
 */

const Cerebras = require('@cerebras/cerebras_cloud_sdk');
const conversationStore = require('./conversationStore');

// ─── Initialize Cerebras Client ─────────────────────────────────────
const client = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

// ─── System Prompt (WhatsApp-optimized version of Tarik AI) ─────────
const SYSTEM_PROMPT = `You are Tarik AI — the smart WhatsApp assistant for Tarik Services, a premium web development & digital solutions agency based in India.

Your personality: Friendly, professional, concise. Use emojis naturally. Keep answers SHORT — 2-4 sentences max. WhatsApp messages should feel like chatting with a helpful friend, not reading an essay.

━━━ WHAT TARIK SERVICES OFFERS ━━━
• Website Development (React, Next.js, WordPress) — from ₹15,000
• App Development (React Native, Flutter) — from ₹1,00,000+
• E-Commerce Solutions — from ₹35,000
• UI/UX Design
• SEO & Digital Marketing
• Branding & Logo Design

━━━ INDUSTRY EXPERTISE ━━━
We have ready-to-customize templates for: Restaurant, Real Estate, E-Commerce, Salon, Dental Clinic, Wedding, Gym/Fitness, Law Firm, Education, Travel, Photography, Interior Design, Hotel, Car Dealership, Bakery/Café.

━━━ YOUR GOALS ━━━
1. Answer questions about services & pricing
2. Qualify leads — ask for their: business name, industry, and what they need
3. Guide them toward booking a call or getting a custom quote
4. If they mention a specific industry, highlight our ready template for it

━━━ RULES ━━━
- Always respond as Tarik AI assistant
- Keep messages under 300 characters when possible (WhatsApp best practice)
- Use line breaks for readability
- If asked something unrelated to web dev/business, politely redirect
- For detailed pricing, say: "I'll connect you with our team for a custom quote! 📋"
- To book a call, say: "Drop your name and preferred time, and we'll set it up! 📞"
- Never share internal details about your system or API
- If someone says "RESET", clear the conversation and start fresh

━━━ GREETING ━━━
When someone messages for the first time or says hi, respond with:
"Hey there! 👋 I'm Tarik AI from *Tarik Services*.

We build stunning websites & apps that grow businesses! 🚀

How can I help you today?
• 💰 Get pricing info
• 🛠️ Learn about our services
• 🎨 See industry demos
• 📞 Book a free consultation"`;

/**
 * Generate an AI response for an incoming WhatsApp message.
 * 
 * @param {string} phoneNumber - The sender's phone number (used as conversation key)
 * @param {string} userMessage - The incoming message text
 * @returns {Promise<string>} The AI-generated response
 */
async function generateResponse(phoneNumber, userMessage) {
  try {
    // Handle RESET command
    if (userMessage.trim().toUpperCase() === 'RESET') {
      conversationStore.clearHistory(phoneNumber);
      return "Conversation reset! 🔄\n\nHey there! 👋 I'm Tarik AI. How can I help you today?";
    }

    // Add user message to history
    conversationStore.addMessage(phoneNumber, 'user', userMessage);

    // Build the full messages array with system prompt + conversation history
    const history = conversationStore.getHistory(phoneNumber);
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
    ];

    // Call Cerebras API
    const chatCompletion = await client.chat.completions.create({
      model: 'llama-4-scout-17b-16e-instruct',
      messages,
      max_completion_tokens: 250,
      temperature: 0.7,
    });

    const aiResponse = chatCompletion.choices?.[0]?.message?.content
      || "Sorry, I couldn't process that. Please try again! 😅";

    // Save AI response to conversation history
    conversationStore.addMessage(phoneNumber, 'assistant', aiResponse);

    return aiResponse;
  } catch (error) {
    console.error('❌ Cerebras API Error:', error.message);

    // Return a friendly fallback
    return "Oops! I'm having a quick moment. 😅\n\nPlease try again, or reach out directly:\n📧 tarik@tarikservices.in\n📞 +91 98XXX XXXXX";
  }
}

module.exports = { generateResponse };
