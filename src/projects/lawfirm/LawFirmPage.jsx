import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuChevronDown, LuUser } from 'react-icons/lu';
import practiceData, { practiceCategories, attorneys } from './data/practiceData';
import heroBg from './images/hero-bg.png';
import './LawFirmPage.css';

const ease = [0.4, 0, 0, 1];
const navLinks = [
  { label: 'Practice Areas', href: '#lf-practices' },
  { label: 'Our Team', href: '#lf-team' },
  { label: 'Consult', href: '#lf-consult' },
];

export default function LawFirmPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', area: '', urgency: '', details: '' });

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => { e.preventDefault(); setMobileOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }, []);
  const filteredPractices = activeFilter === 'all' ? practiceData : practiceData.filter((p) => p.category === activeFilter);
  const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFormSubmit = (e) => { e.preventDefault(); setShowToast(true); setFormData({ name: '', phone: '', email: '', area: '', urgency: '', details: '' }); setTimeout(() => setShowToast(false), 3000); };

  return (
    <div className="lf-page">
      <Link to="/" className="lf-back-badge"><LuArrowLeft size={14} /> Back to Tarik</Link>

      <nav className={`lf-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="lf-navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Legal<span>Edge</span></div>
        <div className="lf-nav-links">
          {navLinks.map((l) => <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>{l.label}</a>)}
          <a href="#lf-consult" className="lf-cta-btn" onClick={(e) => handleNavClick(e, '#lf-consult')}>Free Consultation</a>
        </div>
        <div className={`lf-mobile-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}><span /><span /><span /></div>
      </nav>
      <div className={`lf-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((l) => <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>{l.label}</a>)}
        <a href="#lf-consult" className="lf-cta-btn" onClick={(e) => handleNavClick(e, '#lf-consult')}>Free Consultation</a>
      </div>

      <section className="lf-hero">
        <div className="lf-hero-bg"><img src={heroBg} alt="LegalEdge Law Firm" /></div>
        <div className="lf-hero-overlay" />
        <motion.div className="lf-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          <div className="lf-hero-badge">✦ Advocates & Legal Consultants ✦</div>
          <h1 className="lf-hero-title">Legal<span className="lf-hero-title-accent">Edge</span></h1>
          <p className="lf-hero-tagline">Delhi&apos;s trusted law firm — fighting for your rights with integrity, expertise, and 25+ years of courtroom experience.</p>
          <div className="lf-hero-buttons">
            <a href="#lf-consult" className="lf-cta-btn" onClick={(e) => handleNavClick(e, '#lf-consult')}>Free Consultation</a>
            <a href="#lf-practices" className="lf-btn-outline" onClick={(e) => handleNavClick(e, '#lf-practices')}>Practice Areas</a>
          </div>
        </motion.div>
        <div className="lf-hero-scroll">Scroll <LuChevronDown /></div>
      </section>

      <section className="lf-practices" id="lf-practices">
        <motion.div className="lf-practices-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="lf-section-label">Practice Areas</div>
          <h2 className="lf-section-title">How We Can Help</h2>
        </motion.div>
        <div className="lf-filter-tabs">
          {practiceCategories.map((t) => <button key={t.id} className={`lf-filter-tab ${activeFilter === t.id ? 'active' : ''}`} onClick={() => setActiveFilter(t.id)}>{t.label}</button>)}
        </div>
        <motion.div className="lf-practice-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredPractices.map((p) => (
              <motion.div key={p.id} className="lf-practice-card" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, ease }}>
                <div className="lf-practice-img"><img src={p.image} alt={p.name} /></div>
                <div className="lf-practice-info">
                  <div className="lf-practice-name">{p.name}</div>
                  <p className="lf-practice-desc">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="lf-team" id="lf-team">
        <motion.div className="lf-team-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="lf-section-label">Our Team</div>
          <h2 className="lf-section-title">Meet Our Advocates</h2>
        </motion.div>
        <div className="lf-team-grid">
          {attorneys.map((a, i) => (
            <motion.div key={i} className="lf-team-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease }}>
              <div className="lf-team-avatar"><LuUser /></div>
              <div className="lf-team-name">{a.name}</div>
              <div className="lf-team-role">{a.role}</div>
              <div className="lf-team-exp">{a.exp}</div>
              <div className="lf-team-spec">{a.speciality}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="lf-consult" id="lf-consult">
        <motion.div className="lf-consult-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="lf-section-label">Get Legal Help</div>
          <h2 className="lf-section-title">Book Free Consultation</h2>
        </motion.div>
        <motion.form className="lf-form" onSubmit={handleFormSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="lf-form-group"><label className="lf-form-label">Full Name</label><input className="lf-input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required /></div>
          <div className="lf-form-group"><label className="lf-form-label">Phone</label><input className="lf-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required /></div>
          <div className="lf-form-group"><label className="lf-form-label">Email</label><input className="lf-input" type="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleFormChange} /></div>
          <div className="lf-form-group">
            <label className="lf-form-label">Legal Area</label>
            <select className="lf-select" name="area" value={formData.area} onChange={handleFormChange} required>
              <option value="">Select</option>
              <option value="corporate">Corporate & Commercial</option>
              <option value="property">Property & RERA</option>
              <option value="family">Family & Matrimonial</option>
              <option value="criminal">Criminal Defence</option>
              <option value="tax">Tax & GST</option>
              <option value="ip">Intellectual Property</option>
              <option value="consumer">Consumer Protection</option>
              <option value="employment">Employment & Labour</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="lf-form-group full-width">
            <label className="lf-form-label">Urgency</label>
            <select className="lf-select" name="urgency" value={formData.urgency} onChange={handleFormChange} required>
              <option value="">Select</option>
              <option value="immediate">Immediate (within 24 hrs)</option>
              <option value="thisweek">This Week</option>
              <option value="notrush">Not Urgent</option>
            </select>
          </div>
          <div className="lf-form-group full-width"><label className="lf-form-label">Brief Description</label><textarea className="lf-textarea" name="details" placeholder="Briefly describe your legal matter..." value={formData.details} onChange={handleFormChange} required /></div>
          <div className="lf-form-submit"><button type="submit" className="lf-cta-btn">Request Consultation</button></div>
        </motion.form>
      </section>

      <footer className="lf-footer">
        <div className="lf-footer-inner">
          <div className="lf-footer-logo">Legal<span>Edge</span></div>
          <div className="lf-footer-copy">© 2026 LegalEdge Associates, B-12 Connaught Place, New Delhi 110001 | Bar Council Reg: D/1234/2001 | All consultations are privileged and confidential.</div>
        </div>
      </footer>

      <AnimatePresence>
        {showToast && (
          <motion.div className="lf-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            ✓ Consultation request received! Our team will contact you within 24 hours.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
