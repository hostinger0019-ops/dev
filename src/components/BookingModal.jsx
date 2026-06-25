import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX, LuShield, LuClock, LuSparkles, LuArrowRight, LuPhone, LuUser, LuBriefcase } from 'react-icons/lu';
import './BookingModal.css';

const WHATSAPP_NUMBER = '918569998653';

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
  '🌐 Free Domain Setup',
  '🖥️ Free Hosting (1 Year)',
  '📈 Free SEO Ranking Setup',
  '📱 Mobile Responsive Design',
  '⚡ Fast Delivery (7 Days)',
];

export default function BookingModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [step, setStep] = useState(1);
  const [slotsLeft, setSlotsLeft] = useState(3);

  // Countdown timer for urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!isOpen) return;
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

  const isFormValid = name.trim().length >= 2 && phone.trim().length >= 10 && industry;

  const handlePayToken = () => {
    if (!isFormValid) return;
    // TODO: Integrate Razorpay here
    // For now, open WhatsApp with booking details
    const msg = `🎉 NEW BOOKING!\n\nName: ${name}\nPhone: ${phone}\nIndustry: ${industry}\nToken: ₹2,500\n\nI want to book my website slot!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleWhatsApp = () => {
    const msg = name
      ? `Hi Tarik, I'm ${name}. I want a ${industry || 'business'} website. Let's discuss!`
      : `Hi Tarik, I saw your ad and I'm interested in getting a website built for my business.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleNext = () => {
    if (step === 1 && name.trim().length >= 2 && phone.trim().length >= 10) {
      setStep(2);
    }
  };

  const handleBack = () => setStep(1);

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
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className="booking-close" onClick={onClose} aria-label="Close">
              <LuX size={18} />
            </button>

            {/* Urgency Banner */}
            <div className="booking-urgency">
              <LuClock size={14} />
              <span>Offer expires in <strong>{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</strong></span>
              <span className="booking-slots">• Only {slotsLeft} slots left!</span>
            </div>

            {/* Header */}
            <div className="booking-header">
              <div className="booking-icon">
                <LuSparkles size={24} />
              </div>
              <h2 className="booking-title">Book Your Slot Now</h2>
              <p className="booking-subtitle">
                ₹25,000 ki website sirf <span className="booking-price-highlight">₹2,500 token</span> mein book karo
              </p>
            </div>

            {/* Benefits Strip */}
            <div className="booking-benefits">
              {benefits.map((b, i) => (
                <span key={i} className="booking-benefit">{b}</span>
              ))}
            </div>

            {/* Warning */}
            <div className="booking-warning">
              <span className="booking-warning-icon">⚠️</span>
              Agar abhi book nahi kiya toh ye benefits — free hosting, domain aur SEO — queue mein next business ko mil jayenge!
            </div>

            {/* Step 1: Name & Phone */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  className="booking-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="booking-field">
                    <LuUser className="booking-field-icon" size={16} />
                    <input
                      type="text"
                      placeholder="Aapka Naam"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="booking-input"
                      autoFocus
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
                  <button
                    className="booking-next-btn"
                    onClick={handleNext}
                    disabled={name.trim().length < 2 || phone.trim().length < 10}
                  >
                    Next — Choose Your Website
                    <LuArrowRight size={16} />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Industry + Pay */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  className="booking-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="booking-field">
                    <LuBriefcase className="booking-field-icon" size={16} />
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="booking-input booking-select"
                    >
                      <option value="">Kaunsi industry ki website chahiye?</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="booking-pay-btn"
                    onClick={handlePayToken}
                    disabled={!industry}
                  >
                    <LuShield size={18} />
                    Pay ₹2,500 Token — Book Now
                  </button>

                  <div className="booking-divider">
                    <span>ya</span>
                  </div>

                  <button className="booking-wa-btn" onClick={handleWhatsApp}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </button>

                  <button className="booking-back-btn" onClick={handleBack}>
                    ← Back
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust badges */}
            <div className="booking-trust">
              <span>🔒 100% Secure</span>
              <span>💸 Token Adjustable in Final Price</span>
              <span>⭐ 50+ Happy Clients</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
