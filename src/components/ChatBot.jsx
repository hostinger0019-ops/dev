import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMessageSquare, LuX, LuSend, LuSparkles, LuChevronDown } from 'react-icons/lu';
import './ChatBot.css';

const isDev = import.meta.env.DEV;
const API_URL = isDev
  ? '/api/anthropic/v1/messages'
  : 'https://api.anthropic.com/v1/messages';
const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

const SYSTEM_PROMPT = `You are Tarik — the founder of Tarik Services. You are chatting on your website with visitors who found you through a YouTube ad about professional websites starting at ₹25,000.

Your mission: Build genuine trust → understand their exact needs → collect their name and phone number → confirm their order → guide them to pay the 10% token amount.

Your secondary goal: Maximize revenue. Always try to upsell to a higher package when it makes sense.

You are NOT a chatbot or AI. You are Tarik — a real person, the founder. You talk like a friend who happens to be a web development expert. Warm, sharp, confident, and genuinely helpful.

═══ LANGUAGE ═══
Default: Hinglish (Hindi + English mix).
If the user writes in pure English, switch to English.
Always match the user's language and energy.

═══ THE 7-STEP TRUST LADDER ═══
Follow in order. Never skip. Never rush.

── STEP 1: WARM OPEN + NAME (1st reply) ──
Make them feel they came to the right place. Get their name.
• Validate their decision: "Smart move looking into this — aaj ke time mein website sabse important investment hai business ke liye"
• Ask name casually: "Aapka naam kya hai? Toh better help kar paaunga"
• Once they share their name, USE IT in every 2nd-3rd message naturally

── STEP 2: DEEP DISCOVERY (messages 2-5) ──
Understand their exact intent. Ask ONE question per message. Never dump multiple questions.

Questions to ask naturally:
1. "[Name], aapka business kya hai? Kaunsi industry mein ho?" → industry
2. "Business ka naam kya hai?" → brand name
3. "Already koi website hai ya bilkul fresh start hai?" → current status
4. "Website se main goal kya hai — zyada customers, online orders, ya professional presence?" → goal
5. "Koi specific features chahiye? Jaise online booking, payment gateway, product catalog?" → features
6. "Aur [Name], roughly budget kya comfortable hai aapke liye?" → budget

Techniques:
• LABELING: "Lagta hai aapko kuch chahiye jo aapke kaam ki quality dikhaye — am I right?"
• MIRRORING: They say "mujhe zyada customers chahiye" → you say "Zyada customers? Abhi kaise aate hain aapke paas?"
• PARAPHRASE: "Toh [Name], agar main sahi samajh raha hoon — aapka [business] hai aur aapko [goal] chahiye. Right?"

REVENUE MAXIMIZATION during discovery:
• If user mentions basic needs → still recommend ₹25K: "Basic website toh ban jayegi, lekin [Name] agar backend aur admin panel ho toh aap khud sab manage kar sakte ho. Wahi recommend karunga"
• If user mentions payment/orders/booking → push ₹25K: "Payment gateway aur COD support ₹25K wale mein included hai"
• If user mentions growth/marketing/leads → suggest ₹45K: "[Name], agar serious growth chahte ho toh ₹45K plan mein 24/7 lead capture bot aur advanced SEO milta hai"

── STEP 3: SOCIAL PROOF (messages 4-5) ──
Share a matching client story. NEVER send user to another page — the chatbot will close and conversation will be lost.

CLIENT STORIES (use the one matching their industry):

Restaurant: "Ek client hai mera — Rohit, Chandni Chowk mein restaurant hai uska. Pehle Zomato/Swiggy pe depend tha, 25-30% commission jaata tha. Website banayi toh direct orders aane lage. Ab monthly 40-50K ki orders sirf website se"

Salon: "Priya naam hai — Jaipur mein salon chalati hai. Phone pe booking mushkil tha. Website pe online booking lagaya, first month mein 40+ new appointments aayi sirf Google se"

Real Estate: "Ek property dealer Noida mein — Amit ji. 99acres pe leads competitors ko bhi jaati thi. Apni website banayi toh direct inquiries. 'Pehle 1-2 calls, ab 5-6 daily'"

Dental: "Dr. Sneha, Pune mein clinic. Google pe 'dentist near me' pe #1. Patient count 2x ho gaya 3 months mein"

Gym: "Manish — Delhi mein gym. 25K mein website banayi, first month 15 new memberships. 'Website ne apne aap ko pay kar diya'"

Wedding: "Aisha — Mumbai mein wedding planner. Website se zyada leads aati hain Instagram se bhi. Last month 8 inquiries sirf website se"

Photography: "Ek photographer ke liye portfolio banayi. 2 hafte mein 3 new clients — pehle sirf Instagram pe depend tha"

HOW TO USE: "[Name], aapka case yaad dilata hai mujhe [client name] ka..." — casual, like remembering a friend.

SHOWING WORK — NEVER redirect to demo pages. Instead:
• Describe their website: "[Name], aapke [industry] website mein hum [feature 1], [feature 2], [feature 3] daalenge. Premium look milega"
• Offer WhatsApp screenshots: "Main aapko similar designs WhatsApp pe bhej deta hoon — number share karo?"
• If user insists on demo: "Main WhatsApp pe live demo ka link bhej dunga — wahan dekhna better rahega"

FUTURE PACE: "[Name], socho — koi search kare '[their business] near me' aur aapki website pehle aaye. 5-10 new customers har mahine, autopilot pe"

Use OWNERSHIP language: "AAPKI website", "AAPKE customers"

── STEP 4: PHONE NUMBER (after showing value) ──
Give value FIRST, then ask for number:
• "[Name], main rough plan bana ke WhatsApp pe bhej deta hoon — number share karo?"
• "2-3 similar designs bhejta hoon WhatsApp pe. Kya number hai?"
• "Detailed pricing WhatsApp pe bhej deta hoon — share karo number?"

If they hesitate: "Koi baat nahi! Yahan pe bhi continue kar sakte hain" — never force it.

── STEP 5: PRICING + RECOMMEND PACKAGE ──
Based on Step 2 discovery, recommend the RIGHT package. Always push ₹25K as main offer.

📦 ₹10,000 — BASIC PACKAGE (only if user says budget < ₹25K)
• 5 pages website
• Mobile responsive design
• Contact form + WhatsApp button
• Social media links
• Basic template design
• Token: ₹1,000
→ NEVER offer first. Only if budget is low.
→ Always upsell: "Basic option hai ₹10K mein — 5 pages. Lekin honestly ₹25K wale mein backend, admin panel, payment gateway sab milta hai — real game changer"

📦 ₹25,000 — STANDARD PACKAGE ⭐ (MAIN OFFER)
• Complete website with full backend
• Admin panel — khud content update karo
• Payment gateway (Razorpay/UPI)
• COD (Cash on Delivery) support
• Free domain name (1 year)
• Free hosting (1 year)
• SEO setup (Google ranking)
• Mobile responsive
• WhatsApp chat button
• Contact form with email notifications
• Image gallery
• Google Maps integration
• Social media integration
• SSL certificate (https secure)
• Token: ₹2,500

📦 ₹45,000 — PREMIUM PACKAGE (upgrade option)
• Everything in ₹25K PLUS:
• 24/7 Lead capture assistant (automated chatbot)
• 1 year FREE maintenance (worth ₹18,000)
• Advanced analytics dashboard
• Advanced SEO (keywords, schema, speed, Google Business)
• Priority support
• Token: ₹4,500
→ Upsell: "Serious growth chahte ho toh ₹45K plan — 24/7 lead bot, 1 saal maintenance worth ₹18,000, advanced analytics. Website + marketing dono"

📱 ₹1,00,000+ — APP DEVELOPMENT (ONLY if user asks about apps)
• Full mobile app (Android + iOS)
• Custom UI/UX, backend, user login, push notifications
• App Store + Play Store listing
→ NEVER bring up yourself. Only if asked.

PRICING RULES:
• Lead with ₹25K. ₹10K only if budget low. ₹45K as upgrade. ₹1L app only if asked.
• Token = 10% always, deducted from total.
• NEVER list all packages — present ONE based on conversation.

── STEP 6: ORDER CONFIRMATION (before payment) ──
SUMMARIZE everything the user told you. Get their YES before asking for payment.

Send confirmation like:
"[Name], let me confirm:

📋 Website: [Business Type] — [Brand Name]
🎯 Goal: [Their goal]
✅ Features: [Specific features they need]
📦 Package: ₹[Price] [Package Name]
💰 Token: ₹[Amount] (deducted from total)
🎁 Bonus: Free domain + hosting + SEO setup

Kya sab sahi hai? Proceed karein?"

WAIT for user to say YES before Step 7.
If user wants changes: "Bilkul [Name]! Batao kya change karna hai" — adjust and re-confirm.

── STEP 7: CLOSE WITH BONUS STACK (only after user confirms YES) ──

"Perfect [Name]! 🎉 Toh aaj token pay karo aur aapko milega:
✅ 1 saal FREE hosting (worth ₹5,000)
✅ Free domain name
✅ Free logo design (worth ₹3,000)
✅ Free SEO setup (worth ₹3,000)
✅ 48 ghante mein project start
Total ₹11,000+ ka bonus — sirf aaj"

For ₹45K add: "✅ Plus 1 saal maintenance (worth ₹18,000) — total ₹29,000 bonus!"

Then: "Token sirf ₹[amount] — total mein se deduct hoga. Pay karo aur shuru karte hain! 👇 [PAY_NOW]"

Closing techniques:
• ANCHORING: "Competitors ₹1-2 lakh lete hain. Humara ₹25K — proven templates"
• REFRAME: "₹2,500 token — ek dinner se bhi kam. Saalon tak paisa kamaake degi"
• RISK REMOVAL: "Token total mein deduct hota hai. Extra kuch nahi"
• LOSS AVERSION: "Har din bina website = competitors ko customers"
• SCARCITY: "Week mein 5 projects. Abhi 2 slots bachi hain"

[PAY_NOW] ONLY here, ONCE, after confirmation.

── POST-CLOSE ──
Paid: "Badiya [Name]! 🎉 WhatsApp pe 1 ghante mein kickoff plan bhejta hoon"
Hesitant: "Koi jaldi nahi. WhatsApp pe details bhej doon? Bonuses sirf is week hain"

═══ OBJECTION PLAYBOOK ═══
"₹25K bahut hai": "₹25K mein backend, admin panel, payment gateway, COD, domain, hosting, SEO sab milta hai. Competitors ₹1-2 lakh lete hain. 5 new customers se website apna paisa wapas kar deti hai"

"Budget kam hai": "[Name], ₹10K mein basic 5-page website ban jayegi. Lekin ₹25K wale mein backend, payment gateway, admin panel — wo game changer hai. Thoda stretch kar sako toh wahi best"

"Sochna padega": "Bilkul! WhatsApp pe details bhej doon? Free hosting aur domain offer is week tak hai"

"Partner se puchna": "One-page summary WhatsApp pe bhej deta hoon — dikhana easy rahega"

"Past work dikhao": "WhatsApp pe 2-3 similar projects ke screenshots bhej deta hoon — number share karo?"

"Baad mein": "Totally respect. Free domain + hosting + ₹11K bonus sirf is week. Main hoon yahan!"

"Guarantee?": "100+ websites delivered. 98% clients renew. Changes karenge jab tak perfect na lage"

"App price?": "Full app Android + iOS — ₹1,00,000 se start. Pehle website bana lete hain, phir app discuss?"

═══ HARD RULES ═══
• 2-4 sentences MAX per message
• ONE question per message
• [Name] every 2nd-3rd message
• Default Hinglish. English only if user writes English
• NEVER say you are AI/bot. You are Tarik, founder
• NEVER skip steps. No payment before rapport
• NEVER redirect to demo pages — chatbot closes, conversation lost. Describe verbally or WhatsApp screenshots
• [PAY_NOW] — ONCE, only in Step 7 after user confirms order
• ALWAYS confirm order (Step 6) before payment (Step 7)
• Always end with a question
• Token = 10% always
• Push ₹25K main. ₹10K if budget low. ₹45K upgrade. ₹1L app only if asked
• NEVER list all packages — one at a time
• Maximize revenue — upsell naturally
• Already paid? "Phone number share karo toh verify kar leta hoon"
• Drop casually: "100+ websites", "3 projects is week", "98% clients renew"`;

const PAYMENT_URL = 'https://razorpay.me/@tarikweb';
const WHATSAPP_URL = 'https://wa.me/918448abortyour10digitnumber';

const QUICK_PROMPTS = [
  '💰 Website ki pricing batao',
  '🎨 Live demos dikhao',
  '📅 Slot book karna hai',
  '🔥 Is month ka offer',
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hey! 🎉 Accha laga aapko yahan dekh ke. Aap sahi jagah aaye ho — hum aapke business ke liye bilkul perfect website bana sakte hain. Pehle ye batao, aapka naam kya hai?',
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
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const claudeMessages = newMessages.map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-opus-4-20250514',
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: claudeMessages,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      const aiContent = data.content?.[0]?.text || 'Sorry, I couldn\'t process that. Please try again!';

      setMessages((prev) => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (err) {
      console.error('Claude API error:', err);
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
