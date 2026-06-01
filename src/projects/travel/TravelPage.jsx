import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuChevronDown, LuClock, LuStar, LuShield, LuHeadphones, LuBadgeCheck, LuRefreshCw, LuPlus } from 'react-icons/lu';
import tripData, { tripCategories } from './data/tripData';
import './TravelPage.css';
const heroBg = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=900&fit=crop';

const ease = [0.4, 0, 0, 1];
const navLinks = [{ label: 'Packages', href: '#tv-trips' }, { label: 'Why Us', href: '#tv-why' }, { label: 'Book', href: '#tv-booking' }, { label: 'FAQ', href: '#tv-faq' }];

const whyFeatures = [
  { icon: <LuBadgeCheck />, name: 'IATA Accredited', desc: 'Recognized by International Air Transport Association — your bookings are fully protected.' },
  { icon: <LuShield />, name: 'No Hidden Charges', desc: 'Transparent pricing with no surprise fees. What you see is exactly what you pay.' },
  { icon: <LuHeadphones />, name: '24/7 Travel Support', desc: 'Round-the-clock assistance during your trip via call, WhatsApp, or email.' },
  { icon: <LuRefreshCw />, name: 'Flexible Cancellation', desc: 'Free cancellation up to 7 days before departure. Full refund, no questions asked.' },
];

const testimonials = [
  { text: '"Our Kashmir trip with WanderBharat was magical! The Dal Lake houseboat stay and Gulmarg gondola ride were unforgettable. Everything was perfectly organized."', author: 'Ananya & Rohit Gupta', role: 'Kashmir 6N/7D, December 2025' },
  { text: '"The Rajasthan Royal Trail exceeded all expectations. From Jaipur\'s Hawa Mahal to Jaisalmer\'s desert safari — every moment was curated to perfection."', author: 'Meera Iyer', role: 'Rajasthan 7N/8D, October 2025' },
  { text: '"Booked the Andaman package for our anniversary. Scuba diving at Havelock was a life-changing experience! Great hotels, smooth transfers, amazing food."', author: 'Vikram & Priyanka Shah', role: 'Andaman 5N/6D, March 2026' },
];

const faqItems = [
  { q: 'Do I need a permit to visit Ladakh?', a: 'Yes, Indian tourists need an Inner Line Permit (ILP) for areas like Pangong Lake, Nubra Valley, and Tso Moriri. We arrange all permits as part of the package at no extra cost.' },
  { q: 'What is the best time to visit Kashmir?', a: 'For snow: December to February. For greenery & flowers: March to May. For pleasant weather: September to November. We offer packages for all seasons.' },
  { q: 'How do I reach Andaman — is there a ferry?', a: 'You can fly directly to Port Blair from Delhi, Mumbai, Chennai, or Kolkata (2-3 hrs). Ferries from Chennai/Kolkata take 50-60 hours and are not recommended for short trips.' },
  { q: 'Are meals included in the packages?', a: 'Yes! All our packages include breakfast. MAP (breakfast + dinner) and AP (all meals) plans are available at a small supplement. We cater to Jain, vegetarian, and non-veg preferences.' },
  { q: 'Can I customize a package or change hotels?', a: 'Absolutely! All packages are fully customizable. You can upgrade hotels, add activities, change duration, or create a completely custom itinerary. Just tell us your preferences in the booking form.' },
  { q: 'Do you offer EMI or payment plans?', a: 'Yes, we offer 0% EMI options through select credit cards (HDFC, ICICI, SBI) for bookings above ₹25,000. You can also pay in 2-3 installments via bank transfer.' },
];

export default function TravelPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', destination: '', travelers: '', date: '', notes: '' });

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => { const timer = setInterval(() => { setCurrentTestimonial((p) => (p + 1) % testimonials.length); }, 5000); return () => clearInterval(timer); }, []);
  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [mobileOpen]);
  const handleNavClick = useCallback((e, href) => { e.preventDefault(); setMobileOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }, []);
  const filtered = activeFilter === 'all' ? tripData : tripData.filter((t) => t.category === activeFilter);
  const handleFormChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setShowToast(true); setFormData({ name: '', phone: '', destination: '', travelers: '', date: '', notes: '' }); setTimeout(() => setShowToast(false), 3000); };

  return (
    <div className="tv-page">
      <Link to="/" className="tv-back-badge"><LuArrowLeft size={14} /> Back to Tarik</Link>
      <nav className={`tv-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="tv-navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Wander<span>Bharat</span></div>
        <div className="tv-nav-links">
          {navLinks.map((l) => <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>{l.label}</a>)}
          <a href="#tv-booking" className="tv-cta-btn" onClick={(e) => handleNavClick(e, '#tv-booking')}>Plan My Trip</a>
        </div>
        <div className={`tv-mobile-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}><span /><span /><span /></div>
      </nav>
      <div className={`tv-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((l) => <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>{l.label}</a>)}
        <a href="#tv-booking" className="tv-cta-btn" onClick={(e) => handleNavClick(e, '#tv-booking')}>Plan My Trip</a>
      </div>

      <section className="tv-hero">
        <div className="tv-hero-bg"><img src={heroBg} alt="WanderBharat Travel" /></div>
        <div className="tv-hero-overlay" />
        <motion.div className="tv-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          <div className="tv-hero-badge">✦ Explore Incredible India ✦</div>
          <h1 className="tv-hero-title">Wander<span className="tv-hero-title-accent">Bharat</span></h1>
          <p className="tv-hero-tagline">Handcrafted tour packages across India — from Kashmir to Kerala, mountains to beaches, heritage to adventure.</p>
          <div className="tv-hero-buttons">
            <a href="#tv-booking" className="tv-cta-btn" onClick={(e) => handleNavClick(e, '#tv-booking')}>Plan My Trip</a>
            <a href="#tv-trips" className="tv-btn-outline" onClick={(e) => handleNavClick(e, '#tv-trips')}>View Packages</a>
          </div>
        </motion.div>
        <div className="tv-hero-scroll">Scroll <LuChevronDown /></div>
      </section>

      <section className="tv-trips" id="tv-trips">
        <motion.div className="tv-trips-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="tv-section-label">Tour Packages</div>
          <h2 className="tv-section-title">Popular Destinations</h2>
        </motion.div>
        <div className="tv-filter-tabs">
          {tripCategories.map((t) => <button key={t.id} className={`tv-filter-tab ${activeFilter === t.id ? 'active' : ''}`} onClick={() => setActiveFilter(t.id)}>{t.label}</button>)}
        </div>
        <motion.div className="tv-trip-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((trip) => (
              <motion.div key={trip.id} className="tv-trip-card" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, ease }}>
                <div className="tv-trip-img"><img src={trip.image} alt={trip.name} /></div>
                <div className="tv-trip-info">
                  <div className="tv-trip-name">{trip.name}</div>
                  <p className="tv-trip-desc">{trip.description}</p>
                  <div className="tv-trip-meta">
                    <span className="tv-trip-price">{trip.price}</span>
                    <span className="tv-trip-duration"><LuClock size={10} /> {trip.duration}</span>
                    <span className="tv-trip-rating"><LuStar size={10} /> {trip.rating}</span>
                    <button className="tv-trip-book" onClick={() => document.querySelector('#tv-booking')?.scrollIntoView({ behavior: 'smooth' })}>Book</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="tv-booking" id="tv-booking">
        <motion.div className="tv-booking-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="tv-section-label">Plan Your Trip</div>
          <h2 className="tv-section-title">Customize Your Journey</h2>
        </motion.div>
        <motion.form className="tv-form" onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="tv-form-group"><label className="tv-form-label">Full Name</label><input className="tv-input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required /></div>
          <div className="tv-form-group"><label className="tv-form-label">Phone</label><input className="tv-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required /></div>
          <div className="tv-form-group">
            <label className="tv-form-label">Destination</label>
            <select className="tv-select" name="destination" value={formData.destination} onChange={handleFormChange} required>
              <option value="">Select</option>
              <option value="kashmir">Kashmir</option><option value="leh">Leh-Ladakh</option><option value="goa">Goa</option>
              <option value="andaman">Andaman</option><option value="kerala">Kerala</option><option value="rajasthan">Rajasthan</option>
              <option value="golden">Golden Triangle</option><option value="northeast">Northeast</option><option value="custom">Custom</option>
            </select>
          </div>
          <div className="tv-form-group">
            <label className="tv-form-label">Travelers</label>
            <select className="tv-select" name="travelers" value={formData.travelers} onChange={handleFormChange} required>
              <option value="">Select</option><option value="1">Solo</option><option value="2">Couple</option>
              <option value="3-5">3-5 People</option><option value="6-10">6-10 (Group)</option><option value="10+">10+ (Large Group)</option>
            </select>
          </div>
          <div className="tv-form-group"><label className="tv-form-label">Travel Date</label><input className="tv-input" type="date" name="date" value={formData.date} onChange={handleFormChange} required /></div>
          <div className="tv-form-group full-width"><label className="tv-form-label">Special Requests</label><textarea className="tv-textarea" name="notes" placeholder="Budget, accommodation preference, activities, dietary needs..." value={formData.notes} onChange={handleFormChange} /></div>
          <div className="tv-form-submit"><button type="submit" className="tv-cta-btn">Get Custom Quote</button></div>
        </motion.form>
      </section>

      {/* Why Choose Us */}
      <section className="tv-why" id="tv-why">
        <motion.div className="tv-why-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="tv-section-label">Why Choose Us</div>
          <h2 className="tv-section-title">Travel With Confidence</h2>
        </motion.div>
        <div className="tv-why-grid">
          {whyFeatures.map((f, i) => (
            <motion.div key={i} className="tv-why-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease }}>
              <div className="tv-why-icon">{f.icon}</div>
              <div className="tv-why-name">{f.name}</div>
              <div className="tv-why-desc">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="tv-testimonials">
        <motion.div className="tv-testimonials-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="tv-section-label">Traveler Stories</div>
          <h2 className="tv-section-title">Happy Travelers</h2>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div key={currentTestimonial} className="tv-testimonial-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }}>
            <div className="tv-testimonial-stars">{[...Array(5)].map((_, i) => <LuStar key={i} />)}</div>
            <p className="tv-testimonial-text">{testimonials[currentTestimonial].text}</p>
            <div className="tv-testimonial-author">{testimonials[currentTestimonial].author}</div>
            <div className="tv-testimonial-role">{testimonials[currentTestimonial].role}</div>
          </motion.div>
        </AnimatePresence>
        <div className="tv-testimonial-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`tv-testimonial-dot ${i === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(i)} aria-label={`Review ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="tv-faq" id="tv-faq">
        <motion.div className="tv-faq-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="tv-section-label">Common Questions</div>
          <h2 className="tv-section-title">Frequently Asked</h2>
        </motion.div>
        <div className="tv-faq-list">
          {faqItems.map((item, i) => (
            <motion.div key={i} className={`tv-faq-item ${openFaq === i ? 'open' : ''}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4, ease }}>
              <button className="tv-faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {item.q}
                <span className="tv-faq-icon"><LuPlus /></span>
              </button>
              <div className="tv-faq-answer"><p>{item.a}</p></div>
            </motion.div>
          ))}
        </div>
      </section>
      <footer className="tv-footer">
        <div className="tv-footer-inner">
          <div className="tv-footer-logo">Wander<span>Bharat</span></div>
          <div className="tv-footer-copy">© 2026 WanderBharat Tours Pvt. Ltd., New Delhi | IATA Accredited | MOT Approved | travel@wanderbharat.in</div>
        </div>
      </footer>

      <AnimatePresence>
        {showToast && (
          <motion.div className="tv-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            ✓ Trip inquiry received! Our travel expert will call you within 2 hours.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
