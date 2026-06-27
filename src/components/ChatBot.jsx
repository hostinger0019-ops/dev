import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMessageSquare, LuX, LuSend, LuSparkles, LuChevronDown } from 'react-icons/lu';
import { trackWhatsAppClick } from '../utils/gtag';
import './ChatBot.css';

// Backend API URL
const API_BASE = import.meta.env.DEV
  ? 'http://localhost:3700'
  : 'https://agentforja.com/chatbot-api';

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
  const [isOpen, setIsOpen] = useState(false);
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
  const sessionReady = useRef(false);

  // Initialize session on mount — get session ID + greeting
  useEffect(() => {
    async function initSession() {
      try {
        const res = await fetch(`${API_BASE}/api/chat/init`, { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          sessionIdRef.current = data.sessionId;
          setMessages([{ role: 'assistant', content: data.greeting }]);
          sessionReady.current = true;
        } else {
          throw new Error('Init failed');
        }
      } catch {
        setMessages([{ role: 'assistant', content: DEFAULT_GREETING }]);
        sessionReady.current = true;
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
      {/* WhatsApp Button */}
      <motion.a
        className={`whatsapp-fab ${isOpen ? 'hidden' : ''}`}
        href="https://wa.me/918569998653?text=Hi%20Tarik%2C%20I%20visited%20your%20website%20and%20I%27m%20interested%20in%20getting%20a%20website%20built%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating_button')}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.4, type: 'spring', stiffness: 200 }}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="whatsapp-fab-label">WhatsApp</span>
      </motion.a>

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
                        onClick={() => trackWhatsAppClick('chatbot')}
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
