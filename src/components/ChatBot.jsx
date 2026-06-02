import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMessageSquare, LuX, LuSend, LuBot, LuUser, LuSparkles } from 'react-icons/lu';
import './ChatBot.css';

const isDev = import.meta.env.DEV;
const CEREBRAS_API_URL = isDev
  ? '/api/cerebras/v1/chat/completions'
  : 'https://api.cerebras.ai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_CEREBRAS_API_KEY;

const SYSTEM_PROMPT = `You are Tarik AI — the smart assistant for Tarik Services, a premium web development & digital solutions agency based in India.

Your personality: Friendly, professional, concise. Use occasional emojis. Keep answers SHORT (2-4 sentences max).

What Tarik Services offers:
- Website Development (React, Next.js, WordPress)
- App Development (React Native, Flutter)
- UI/UX Design
- SEO & Digital Marketing
- E-Commerce Solutions
- Branding & Logo Design

Industry demos available: Restaurant, Real Estate, E-Commerce, Salon, Dental, Wedding, Gym, Law Firm, Education, Travel, Photography, Interior Design, Hotel, Car Dealership, Bakery/Café.

Pricing: Custom quotes based on project scope. Starter websites from ₹15,000. E-commerce from ₹35,000. Full apps from ₹1,00,000+.

Contact: tarik@tarikservices.in | +91 98XXX XXXXX | Based in New Delhi, India.

Rules:
- Always answer as Tarik AI assistant
- If asked something unrelated to web dev/business, politely redirect
- Suggest exploring demo pages when relevant
- Be enthusiastic about helping businesses grow online`;

const QUICK_PROMPTS = [
  '💰 Pricing info',
  '🛠️ Services offered',
  '📱 App development',
  '🎨 View demos',
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hey there! 👋 I\'m Tarik AI. How can I help you today? Ask me about our services, pricing, or explore our industry demos!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  // Show unread indicator after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setHasUnread(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...newMessages.map((m) => ({ role: m.role, content: m.content })),
      ];

      const res = await fetch(CEREBRAS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-oss-120b',
          messages: apiMessages,
          max_completion_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      const aiContent = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t process that. Please try again!';

      setMessages((prev) => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (err) {
      console.error('Cerebras API error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Oops! I\'m having trouble connecting right now. 😅 Please try again in a moment, or reach out directly at tarik@tarikservices.in',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickPrompt = (prompt) => {
    sendMessage(prompt);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className={`chatbot-fab ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, type: 'spring', stiffness: 200 }}
        aria-label="Open AI Chat"
      >
        <LuMessageSquare size={22} />
        <span className="chatbot-fab-label">Ask AI</span>
        {hasUnread && <span className="chatbot-fab-badge" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0, 1] }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">
                  <LuSparkles size={16} />
                </div>
                <div>
                  <div className="chatbot-header-name">Tarik AI</div>
                  <div className="chatbot-header-status">
                    <span className="chatbot-status-dot" />
                    Powered by Cerebras
                  </div>
                </div>
              </div>
              <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <LuX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chatbot-msg ${msg.role}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="chatbot-msg-icon">
                    {msg.role === 'assistant' ? <LuBot size={14} /> : <LuUser size={14} />}
                  </div>
                  <div className="chatbot-msg-bubble">
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  className="chatbot-msg assistant"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="chatbot-msg-icon">
                    <LuBot size={14} />
                  </div>
                  <div className="chatbot-msg-bubble chatbot-typing">
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 2 && !isLoading && (
              <div className="chatbot-quick">
                {QUICK_PROMPTS.map((p) => (
                  <button key={p} className="chatbot-quick-btn" onClick={() => handleQuickPrompt(p)}>
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form className="chatbot-input-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" className="chatbot-send" disabled={!input.trim() || isLoading} aria-label="Send message">
                <LuSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
