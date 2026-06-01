import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuArrowLeft, LuChevronDown, LuClock, LuUser,
  LuCalendarDays, LuInstagram, LuFacebook,
} from 'react-icons/lu';
import classData, { classCategories, membershipPlans } from './data/membershipData';
import './GymPage.css';
const heroBg = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop';

const ease = [0.4, 0, 0, 1];

const navLinks = [
  { label: 'Plans', href: '#gm-pricing' },
  { label: 'Classes', href: '#gm-classes' },
  { label: 'Join', href: '#gm-booking' },
];

export default function GymPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', plan: '', goal: '', notes: '',
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const filteredClasses = activeFilter === 'all'
    ? classData
    : classData.filter((c) => c.category === activeFilter);

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setFormData({ name: '', phone: '', email: '', plan: '', goal: '', notes: '' });
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="gm-page">
      <Link to="/" className="gm-back-badge">
        <LuArrowLeft size={14} /> Back to Tarik
      </Link>

      {/* Navbar */}
      <nav className={`gm-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="gm-navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Fit<span>Forge</span>
        </div>
        <div className="gm-nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
          ))}
          <a href="#gm-booking" className="gm-cta-btn" onClick={(e) => handleNavClick(e, '#gm-booking')}>
            Join Now
          </a>
        </div>
        <div className={`gm-mobile-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`gm-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
        ))}
        <a href="#gm-booking" className="gm-cta-btn" onClick={(e) => handleNavClick(e, '#gm-booking')}>Join Now</a>
      </div>

      {/* Hero */}
      <section className="gm-hero">
        <div className="gm-hero-bg">
          <img src={heroBg} alt="FitForge Gym" />
        </div>
        <div className="gm-hero-overlay" />
        <motion.div className="gm-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          <div className="gm-hero-badge">✦ No Excuses ✦</div>
          <h1 className="gm-hero-title">
            Fit<span className="gm-hero-title-accent">Forge</span>
          </h1>
          <p className="gm-hero-tagline">
            Transform your body, elevate your mind. Delhi&apos;s most premium fitness destination with world-class trainers and equipment.
          </p>
          <div className="gm-hero-buttons">
            <a href="#gm-booking" className="gm-cta-btn" onClick={(e) => handleNavClick(e, '#gm-booking')}>
              Start Free Trial
            </a>
            <a href="#gm-pricing" className="gm-btn-outline" onClick={(e) => handleNavClick(e, '#gm-pricing')}>
              View Plans
            </a>
          </div>
        </motion.div>
        <div className="gm-hero-scroll">Scroll <LuChevronDown /></div>
      </section>

      {/* Stats */}
      <motion.section className="gm-stats" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease }}>
        <div className="gm-stats-grid">
          {[{ n: '10,000+', l: 'Active Members' }, { n: '50+', l: 'Expert Trainers' }, { n: '25,000 sq.ft', l: 'Training Floor' }, { n: '4.8★', l: 'Google Rating' }].map((s, i) => (
            <div key={i} className="gm-stat-item">
              <div className="gm-stat-number">{s.n}</div>
              <div className="gm-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Pricing */}
      <section className="gm-pricing" id="gm-pricing">
        <motion.div className="gm-pricing-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="gm-section-label">Membership</div>
          <h2 className="gm-section-title">Choose Your Plan</h2>
        </motion.div>

        <div className="gm-pricing-grid">
          {membershipPlans.map((plan, i) => (
            <motion.div key={plan.id} className={`gm-plan-card ${plan.popular ? 'popular' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease }}>
              {plan.popular && <div className="gm-plan-popular">Most Popular</div>}
              <div className="gm-plan-name">{plan.name}</div>
              <div className="gm-plan-price">{plan.price}<small>{plan.period}</small></div>
              <ul className="gm-plan-features">
                {plan.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <button className="gm-cta-btn gm-plan-cta" onClick={() => { document.querySelector('#gm-booking')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Classes */}
      <section className="gm-classes" id="gm-classes">
        <motion.div className="gm-classes-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="gm-section-label">Group Classes</div>
          <h2 className="gm-section-title">Train Together</h2>
        </motion.div>

        <div className="gm-filter-tabs">
          {classCategories.map((t) => (
            <button key={t.id} className={`gm-filter-tab ${activeFilter === t.id ? 'active' : ''}`} onClick={() => setActiveFilter(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <motion.div className="gm-class-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredClasses.map((cls) => (
              <motion.div key={cls.id} className="gm-class-card" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, ease }}>
                <div className="gm-class-img">
                  <img src={cls.image} alt={cls.name} />
                </div>
                <div className="gm-class-info">
                  <div className="gm-class-name">{cls.name}</div>
                  <p className="gm-class-desc">{cls.description}</p>
                  <div className="gm-class-meta">
                    <span className="gm-class-meta-item"><LuClock size={11} /> {cls.duration}</span>
                    <span className="gm-class-meta-item gm-class-trainer"><LuUser size={11} /> {cls.trainer}</span>
                    <span className="gm-class-meta-item"><LuCalendarDays size={11} /> {cls.schedule}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Booking */}
      <section className="gm-booking" id="gm-booking">
        <motion.div className="gm-booking-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="gm-section-label">Get Started</div>
          <h2 className="gm-section-title">Join FitForge</h2>
        </motion.div>

        <motion.form className="gm-form" onSubmit={handleFormSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="gm-form-group">
            <label className="gm-form-label">Full Name</label>
            <input className="gm-input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required />
          </div>
          <div className="gm-form-group">
            <label className="gm-form-label">Phone</label>
            <input className="gm-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required />
          </div>
          <div className="gm-form-group">
            <label className="gm-form-label">Email</label>
            <input className="gm-input" type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleFormChange} required />
          </div>
          <div className="gm-form-group">
            <label className="gm-form-label">Membership Plan</label>
            <select className="gm-select" name="plan" value={formData.plan} onChange={handleFormChange} required>
              <option value="">Select Plan</option>
              <option value="starter">Starter — ₹1,499/mo</option>
              <option value="pro">Pro — ₹2,999/mo</option>
              <option value="elite">Elite — ₹4,999/mo</option>
              <option value="annual">Annual Pro — ₹24,999/yr</option>
              <option value="trial">Free Trial (3 Days)</option>
            </select>
          </div>
          <div className="gm-form-group full-width">
            <label className="gm-form-label">Fitness Goal</label>
            <select className="gm-select" name="goal" value={formData.goal} onChange={handleFormChange} required>
              <option value="">Select Goal</option>
              <option value="weightloss">Weight Loss</option>
              <option value="muscle">Muscle Building</option>
              <option value="strength">Strength Training</option>
              <option value="flexibility">Flexibility & Yoga</option>
              <option value="endurance">Endurance & Stamina</option>
              <option value="general">General Fitness</option>
            </select>
          </div>
          <div className="gm-form-group full-width">
            <label className="gm-form-label">Anything Else?</label>
            <textarea className="gm-textarea" name="notes" placeholder="Any injuries, medical conditions, preferred timing, etc." value={formData.notes} onChange={handleFormChange} />
          </div>
          <div className="gm-form-submit">
            <button type="submit" className="gm-cta-btn">Start My Journey</button>
          </div>
        </motion.form>
      </section>

      {/* Footer */}
      <footer className="gm-footer">
        <div className="gm-footer-inner">
          <div className="gm-footer-logo">Fit<span>Forge</span></div>
          <div className="gm-footer-copy">© 2026 FitForge Fitness Pvt. Ltd., Rajouri Garden, New Delhi | +91 98765 00000</div>
          <div className="gm-footer-socials">
            <a href="#" className="gm-footer-social" aria-label="Instagram"><LuInstagram /></a>
            <a href="#" className="gm-footer-social" aria-label="Facebook"><LuFacebook /></a>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div className="gm-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            ✓ Registration received! Our trainer will call you to schedule your first session.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
