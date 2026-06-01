import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuChevronDown, LuClock, LuUsers, LuStar } from 'react-icons/lu';
import courseData, { courseCategories } from './data/courseData';
import './EducationPage.css';
const heroBg = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=900&fit=crop';

const ease = [0.4, 0, 0, 1];
const navLinks = [{ label: 'Courses', href: '#ed-courses' }, { label: 'Enrol', href: '#ed-enroll' }];

export default function EducationPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', course: '', city: '' });

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [mobileOpen]);
  const handleNavClick = useCallback((e, href) => { e.preventDefault(); setMobileOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }, []);
  const filtered = activeFilter === 'all' ? courseData : courseData.filter((c) => c.category === activeFilter);
  const handleFormChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setShowToast(true); setFormData({ name: '', phone: '', course: '', city: '' }); setTimeout(() => setShowToast(false), 3000); };

  return (
    <div className="ed-page">
      <Link to="/" className="ed-back-badge"><LuArrowLeft size={14} /> Back to Tarik</Link>
      <nav className={`ed-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="ed-navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top<span>Rank</span></div>
        <div className="ed-nav-links">
          {navLinks.map((l) => <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>{l.label}</a>)}
          <a href="#ed-enroll" className="ed-cta-btn" onClick={(e) => handleNavClick(e, '#ed-enroll')}>Enrol Now</a>
        </div>
        <div className={`ed-mobile-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}><span /><span /><span /></div>
      </nav>
      <div className={`ed-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((l) => <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>{l.label}</a>)}
        <a href="#ed-enroll" className="ed-cta-btn" onClick={(e) => handleNavClick(e, '#ed-enroll')}>Enrol Now</a>
      </div>

      <section className="ed-hero">
        <div className="ed-hero-bg"><img src={heroBg} alt="TopRank Coaching" /></div>
        <div className="ed-hero-overlay" />
        <motion.div className="ed-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          <div className="ed-hero-badge">✦ India&apos;s Leading Coaching Institute ✦</div>
          <h1 className="ed-hero-title">Top<span className="ed-hero-title-accent">Rank</span></h1>
          <p className="ed-hero-tagline">Crack IIT-JEE, NEET, UPSC, CA & more with India&apos;s top faculty. 50,000+ selections and counting.</p>
          <div className="ed-hero-buttons">
            <a href="#ed-enroll" className="ed-cta-btn" onClick={(e) => handleNavClick(e, '#ed-enroll')}>Enrol Now</a>
            <a href="#ed-courses" className="ed-btn-outline" onClick={(e) => handleNavClick(e, '#ed-courses')}>Browse Courses</a>
          </div>
        </motion.div>
        <div className="ed-hero-scroll">Scroll <LuChevronDown /></div>
      </section>

      <motion.section className="ed-stats" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease }}>
        <div className="ed-stats-grid">
          {[{ n: '50,000+', l: 'Selections' }, { n: '200+', l: 'Expert Faculty' }, { n: '35+', l: 'Centres Across India' }, { n: '4.8★', l: 'Student Rating' }].map((s, i) => (
            <div key={i} className="ed-stat-item"><div className="ed-stat-number">{s.n}</div><div className="ed-stat-label">{s.l}</div></div>
          ))}
        </div>
      </motion.section>

      <section className="ed-courses" id="ed-courses">
        <motion.div className="ed-courses-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="ed-section-label">Our Courses</div>
          <h2 className="ed-section-title">Choose Your Path</h2>
        </motion.div>
        <div className="ed-filter-tabs">
          {courseCategories.map((t) => <button key={t.id} className={`ed-filter-tab ${activeFilter === t.id ? 'active' : ''}`} onClick={() => setActiveFilter(t.id)}>{t.label}</button>)}
        </div>
        <motion.div className="ed-course-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => (
              <motion.div key={c.id} className="ed-course-card" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, ease }}>
                <div className="ed-course-img"><img src={c.image} alt={c.name} /></div>
                <div className="ed-course-info">
                  <div className="ed-course-name">{c.name}</div>
                  <p className="ed-course-desc">{c.description}</p>
                  <div className="ed-course-meta">
                    <span className="ed-course-price">{c.price}</span>
                    <span className="ed-course-duration"><LuClock size={10} /> {c.duration}</span>
                    <span className="ed-course-students"><LuUsers size={10} /> {c.students}</span>
                    <span className="ed-course-rating"><LuStar size={10} /> {c.rating}</span>
                    <button className="ed-course-enroll" onClick={() => document.querySelector('#ed-enroll')?.scrollIntoView({ behavior: 'smooth' })}>Enrol</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="ed-enroll" id="ed-enroll">
        <motion.div className="ed-enroll-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="ed-section-label">Admissions Open</div>
          <h2 className="ed-section-title">Enrol Today</h2>
        </motion.div>
        <motion.form className="ed-form" onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          <div className="ed-form-group"><label className="ed-form-label">Student Name</label><input className="ed-input" type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleFormChange} required /></div>
          <div className="ed-form-group"><label className="ed-form-label">Phone</label><input className="ed-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required /></div>
          <div className="ed-form-group">
            <label className="ed-form-label">Course</label>
            <select className="ed-select" name="course" value={formData.course} onChange={handleFormChange} required>
              <option value="">Select Course</option>
              <option value="jee">IIT-JEE Advanced</option><option value="neet">NEET UG</option><option value="upsc">UPSC CSE</option>
              <option value="ca">CA Foundation</option><option value="gate">GATE CSE</option><option value="ssc">SSC CGL</option>
              <option value="board10">Class 10 Board</option><option value="other">Other</option>
            </select>
          </div>
          <div className="ed-form-group">
            <label className="ed-form-label">City</label>
            <select className="ed-select" name="city" value={formData.city} onChange={handleFormChange} required>
              <option value="">Select City</option>
              <option value="delhi">Delhi</option><option value="kota">Kota</option><option value="mumbai">Mumbai</option>
              <option value="bangalore">Bengaluru</option><option value="hyderabad">Hyderabad</option><option value="online">Online</option>
            </select>
          </div>
          <div className="ed-form-submit"><button type="submit" className="ed-cta-btn">Request Callback</button></div>
        </motion.form>
      </section>

      <footer className="ed-footer">
        <div className="ed-footer-inner">
          <div className="ed-footer-logo">Top<span>Rank</span></div>
          <div className="ed-footer-copy">© 2026 TopRank Educational Pvt. Ltd. | Centres in Delhi, Kota, Mumbai & 30+ cities | info@toprank.edu.in</div>
        </div>
      </footer>

      <AnimatePresence>
        {showToast && (
          <motion.div className="ed-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            ✓ Enrolment request received! Our counsellor will call you shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
