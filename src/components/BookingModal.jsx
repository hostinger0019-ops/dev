import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX, LuShield, LuClock, LuSparkles, LuArrowRight, LuPhone, LuUser, LuBriefcase, LuGift, LuZap } from 'react-icons/lu';
import './BookingModal.css';

const WHATSAPP_NUMBER = '918569998653';
const API_BASE = 'https://agentforja.com/chatbot-api';
const RAZORPAY_KEY = 'rzp_live_T5qGiTdJMDaPrs';
const TOKEN_AMOUNT = 2500;

const industries = [
  'Restaurant / Cafe',
  'Salon / Spa',
  'E-Commerce / Online Store',
  'Real Estate',
  'Gym / Fitness',
  'Wedding / Event',
  'Education / Coaching',
  'Hotel / Travel',
  'Dental / Clinic',
  'Interior Design',
  'Photography',
  'Law Firm',
  'Other',
];

const benefits = [
  { icon: '🌐', text: 'Free Domain Setup' },
  { icon: '🖥️', text: 'Free Hosting (1 Year)' },
  { icon: '📈', text: 'Free SEO Ranking' },
  { icon: '📱', text: 'Mobile Responsive Design' },
  { icon: '⚡', text: 'Delivery in 7 Days' },
];

// Load Razorpay script
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-sdk')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-sdk';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function BookingModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [step, setStep] = useState(0);
  const [paying, setPaying] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!isOpen) return;
    setStep(0);
    // Preload Razorpay script
    loadRazorpayScript();
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) return { hours: 0, minutes: 0, seconds: 0 };
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handlePayToken = async () => {
    if (!industry || paying) return;
    setPaying(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Payment system failed to load. Please try again.');
      setPaying(false);
      return;
    }

    // Step 1: Create order on backend
    let orderId;
    try {
      const res = await fetch(`${API_BASE}/api/booking/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, industry, amount: TOKEN_AMOUNT }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order creation failed');
      orderId = data.orderId;
    } catch (err) {
      alert('Could not create order. Please try again.');
      setPaying(false);
      return;
    }

    // Step 2: Open Razorpay checkout with order_id
    const options = {
      key: RAZORPAY_KEY,
      amount: TOKEN_AMOUNT * 100,
      currency: 'INR',
      name: 'Tarik Web',
      description: `Website Booking Token - ${industry}`,
      image: 'https://tarikweb.com/favicon.ico',
      order_id: orderId,
      prefill: {
        name: name,
        contact: phone,
      },
      theme: {
        color: '#7C6FFF',
        backdrop_color: 'rgba(0,0,0,0.7)',
      },
      handler: async function (response) {
        // Step 3: Verify payment on backend
        try {
          const verifyRes = await fetch(`${API_BASE}/api/booking/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name,
              phone,
              industry,
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.verified) {
            // Redirect to success page
            const params = new URLSearchParams({
              payment_id: response.razorpay_payment_id,
              name: name,
              phone: phone,
              industry: industry,
            });
            window.location.href = `/payment-success?${params.toString()}`;
          } else {
            alert('Payment verification failed. Contact us on WhatsApp.');
            setPaying(false);
          }
        } catch {
          // Even if verify API fails, payment happened — redirect with payment_id
          const params = new URLSearchParams({
            payment_id: response.razorpay_payment_id,
            name: name,
            phone: phone,
            industry: industry,
          });
          window.location.href = `/payment-success?${params.toString()}`;
        }
      },
      modal: {
        ondismiss: function () {
          setPaying(false);
        },
        confirm_close: true,
        escape: false,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function () {
      alert('Payment failed. Please try again or contact us on WhatsApp.');
      setPaying(false);
    });
    rzp.open();
  };

  const handleWhatsApp = () => {
    const msg = name
      ? `Hi Tarik, I'm ${name}. I want a ${industry || 'business'} website. Let's discuss!`
      : `Hi Tarik, I saw your ad and I'm interested in getting a website built.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="booking-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="booking-modal"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="booking-close" onClick={onClose} aria-label="Close">
              <LuX size={18} />
            </button>

            {/* Urgency Banner */}
            <div className="booking-urgency">
              <LuClock size={14} />
              <span>Offer expires in <strong>{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</strong></span>
              <span className="booking-slots">• Only 3 slots left!</span>
            </div>

            <AnimatePresence mode="wait">

              {/* ═══ STEP 0: Name + Phone + Industry ═══ */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  className="booking-step"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="booking-step-header">
                    <span className="booking-step-num">1/2</span>
                    <h2 className="booking-step-title">Your Details</h2>
                  </div>

                  <div className="booking-form">
                    <div className="booking-field">
                      <LuUser className="booking-field-icon" size={16} />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="booking-input"
                      />
                    </div>
                    <div className="booking-field">
                      <LuPhone className="booking-field-icon" size={16} />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
                        className="booking-input"
                        maxLength={13}
                      />
                    </div>
                    <div className="booking-field">
                      <LuBriefcase className="booking-field-icon" size={16} />
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="booking-input booking-select"
                      >
                        <option value="">Select Your Industry</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="booking-cta-btn"
                      onClick={() => setStep(1)}
                      disabled={name.trim().length < 2 || phone.trim().length < 10 || !industry}
                    >
                      Next — See Your Offer
                      <LuArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ═══ STEP 1: Offer + Pay ═══ */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  className="booking-step"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="booking-offer-hero">
                    <h2 className="booking-title">₹25,000 Website</h2>
                    <div className="booking-offer-price">
                      <span className="booking-original-price">₹25,000</span>
                      <span className="booking-token-price">Book for just ₹2,500</span>
                    </div>
                    <p className="booking-offer-note">Token amount — adjustable in final price</p>
                  </div>

                  <div className="booking-benefits-list">
                    <h3 className="booking-benefits-title">
                      <LuGift size={16} /> What you get FREE:
                    </h3>
                    {benefits.map((b, i) => (
                      <div key={i} className="booking-benefit-item">
                        <span className="booking-benefit-icon">{b.icon}</span>
                        <span className="booking-benefit-text">{b.text}</span>
                        <span className="booking-benefit-check">✓</span>
                      </div>
                    ))}
                  </div>

                  <div className="booking-warning">
                    <span className="booking-warning-icon">⚠️</span>
                    If you don't book now, these free benefits — hosting, domain & SEO — will go to the next business in queue!
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Sticky CTA — visible on step 1 (offer page) */}
            {step === 1 && (
              <div className="booking-sticky-cta">
                <button
                  className="booking-cta-btn"
                  onClick={handlePayToken}
                  disabled={paying}
                >
                  <LuZap size={18} />
                  {paying ? 'Processing...' : 'Yes, I Want to Book! — ₹2,500'}
                  <LuArrowRight size={16} />
                </button>
                <button className="booking-wa-btn-alt" onClick={handleWhatsApp}>
                  Talk on WhatsApp first →
                </button>
                <button className="booking-back-btn" onClick={() => setStep(0)} style={{ marginTop: '4px' }}>
                  ← Back
                </button>
              </div>
            )}

            <div className="booking-trust">
              <span>🔒 100% Secure</span>
              <span>💸 Token Adjusted in Final Price</span>
              <span>⭐ 50+ Happy Clients</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
