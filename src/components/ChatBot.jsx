import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMessageSquare, LuX, LuSend, LuSparkles, LuChevronDown } from 'react-icons/lu';
import './ChatBot.css';

// Backend API URL — set in .env
const API_BASE = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:3700';

const PAYMENT_URL = 'https://razorpay.me/@tarikweb';
const WHATSAPP_URL = 'https://wa.me/918448abortyour10digitnumber';

const QUICK_PROMPTS = [
  '💰 Website ki pricing batao',
  '🎨 Live demos dikhao',
  '📅 Slot book karna hai',
  '🔥 Is month ka offer',
];

// Default greeting (used as fallback if init fails)
const DEFAULT_GREETING = 'Hey! 🎉 Accha laga aapko yahan dekh ke. Aap sahi jagah aaye ho — hum aapke business ke liye bilkul perfect website bana sakte hain. Pehle ye batao, aapka naam kya hai?';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const windowRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const hasSentAuto = useRef(false);
  const sessionIdRef = useRef(null);

  // Initialize session on mount — get session ID + greeting from backend
  useEffect(() => {
    async function initSession() {
      try {
        const res = await fetch(`${API_BASE}/api/chat/init`, { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          sessionIdRef.current = data.sessionId;
          setMessages([{ role: 'assistant', content: data.greeting }]);
        } else {
          throw new Error('Init failed');
        }
      } catch {
        // Fallback — use default greeting without backend session
        setMessages([{ role: 'assistant', content: DEFAULT_GREETING }]);
      }
    }
    initSession();
  }, []);

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
      sendMessage('YouTube pe aapka ad dekha tha ₹25,000 wali website ke baare mein. Mujhe apne business ke liye chahiye!');
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
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (sessionIdRef.current) {
        headers['X-Session-Id'] = sessionIdRef.current;
      }

      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message: text.trim() }),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        console.error('API Response:', res.status, errorBody);
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      // Save session ID if returned
      if (data.sessionId) {
        sessionIdRef.current = data.sessionId;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error('Chatbot API error:', err);
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
                        💳 Token Amount Pay Karo
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
