import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMessageSquare, LuX, LuSend, LuSparkles, LuChevronDown } from 'react-icons/lu';
import './ChatBot.css';

const isDev = import.meta.env.DEV;
const CEREBRAS_API_URL = isDev
  ? '/api/cerebras/v1/chat/completions'
  : 'https://api.cerebras.ai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_CEREBRAS_API_KEY;

const SYSTEM_PROMPT = `You are Tarik — a friendly, persuasive sales expert for Tarik Services, a premium web development agency based in India. You are chatting with visitors who came from a YouTube ad about websites starting at ₹25,000.

Your ONLY goal: Convince the visitor to pay the ₹5,000 token amount to book their project slot.

Sales approach:
1. GREET warmly, acknowledge they saw the ad
2. QUALIFY — ask what industry/business they have (restaurant, salon, real estate, etc.)
3. SHOW VALUE — mention we have 15+ ready-to-customize industry demos. Suggest they check the live demo for their industry on our site
4. CREATE URGENCY — "We only take 5 projects per week" / "This month's price is special"
5. HANDLE OBJECTIONS — if they say too expensive, explain ROI, compare to competitors charging ₹1-2 lakh
6. CLOSE — ask them to pay ₹5,000 token to book their slot. When ready to close, include [PAY_NOW] at the END of your message

Pricing:
- Starter websites: ₹25,000 (what the ad says)
- E-commerce: ₹45,000
- Full apps: ₹1,00,000+
- Token to book: ₹5,000 (adjusted from final price)

Industry demos on our site: Restaurant, Real Estate, E-Commerce, Salon, Dental, Wedding, Gym, Law Firm, Education, Travel, Photography, Interior Design, Hotel, Car Dealership, Bakery

Rules:
- Keep messages SHORT (2-4 sentences). Be conversational, use emojis occasionally
- Talk in Hinglish if the user writes in Hindi
- NEVER mention you are AI. You are "Tarik" — a real person
- If asked unrelated questions, politely bring conversation back to their website needs
- After 3-4 messages of conversation, start pushing toward payment
- When you say the final closing line asking them to pay, add [PAY_NOW] at the very end of that message. Only use [PAY_NOW] once per conversation, at the right closing moment
- If user hesitates after seeing payment, suggest WhatsApp: "You can also reach me on WhatsApp for any questions!"`;

const PAYMENT_URL = 'https://razorpay.me/@tarikweb';
const WHATSAPP_URL = 'https://wa.me/918448abortyour10digitnumber';

const QUICK_PROMPTS = [
  '💰 ₹25K website details',
  '🎨 See live demos',
  '📅 Book my slot',
  '🔥 This month\'s offer',
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome! 🎉 Great to see you here. I noticed you\'re interested in a premium website — let me help you find the perfect one for your business. What industry are you in?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const windowRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const hasSentAuto = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Detect scroll position to show/hide scroll-to-bottom button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Show button when user scrolls more than 100px from bottom
      setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

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

  // Auto-send greeting message on first load
  useEffect(() => {
    if (hasSentAuto.current) return;
    hasSentAuto.current = true;
    const timer = setTimeout(() => {
      sendMessage('I saw your YouTube ad about ₹25,000 websites. Tell me more!');
    }, 1500);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // WhatsApp-style: resize chat window when virtual keyboard opens/closes
  useEffect(() => {
    if (!isOpen) return;
    const vv = window.visualViewport;
    if (!vv) return;
    // Only apply on mobile screens
    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    if (!isMobile) return;

    const handleResize = () => {
      const el = windowRef.current;
      if (!el) return;
      // Shrink chat window to the visible area above the keyboard
      el.style.height = `${vv.height}px`;
      el.style.top = `${vv.offsetTop}px`;
      // Keep latest messages visible
      scrollToBottom();
    };

    // Set initial size
    handleResize();

    vv.addEventListener('resize', handleResize);
    vv.addEventListener('scroll', handleResize);
    return () => {
      vv.removeEventListener('resize', handleResize);
      vv.removeEventListener('scroll', handleResize);
      const el = windowRef.current;
      if (el) {
        el.style.height = '';
        el.style.top = '';
      }
    };
  }, [isOpen, scrollToBottom]);

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
        aria-label="Open Chat"
      >
        <LuMessageSquare size={22} />
        <span className="chatbot-fab-label">Chat</span>
        {hasUnread && <span className="chatbot-fab-badge" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={windowRef}
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
                  <div className="chatbot-header-name">Tarik</div>
                  <div className="chatbot-header-status">
                    <span className="chatbot-status-dot" />
                    Online
                  </div>
                </div>
              </div>
              <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <LuX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages" ref={messagesContainerRef}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chatbot-msg ${msg.role}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="chatbot-msg-bubble">
                    {msg.content.replace('[PAY_NOW]', '')}
                  </div>
                  {msg.role === 'assistant' && msg.content.includes('[PAY_NOW]') && (
                    <div className="chatbot-pay-cta">
                      <a
                        href={PAYMENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chatbot-pay-btn"
                      >
                        💳 Pay ₹5,000 Token
                      </a>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chatbot-whatsapp-btn"
                      >
                        💬 Chat on WhatsApp
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  className="chatbot-msg assistant"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="chatbot-msg-bubble chatbot-typing">
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />

              {/* Scroll to bottom FAB */}
              <AnimatePresence>
                {showScrollBtn && (
                  <motion.button
                    className="chatbot-scroll-btn"
                    onClick={scrollToBottom}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Scroll to bottom"
                  >
                    <LuChevronDown size={18} />
                  </motion.button>
                )}
              </AnimatePresence>
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
