import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuZap } from 'react-icons/lu';
import { useCursor } from '../context/CursorContext';
import MagneticButton from './MagneticButton';
import './Navbar.css';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setCursorHovered, setCursorLabel } = useCursor();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);

    if (isHome) {
      // On homepage — scroll to section
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On project page — navigate home then scroll
      navigate('/' + href);
    }
  };

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleLinkEnter = () => { setCursorHovered(true); setCursorLabel(''); };
  const handleLinkLeave = () => { setCursorHovered(false); };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0, 1] }}
    >
      <div className="navbar-inner">
        <motion.div
          className="navbar-logo"
          whileHover={{ opacity: 0.8 }}
          onClick={handleLogoClick}
          onMouseEnter={handleLinkEnter}
          onMouseLeave={handleLinkLeave}
        >
          <div className="logo-icon"><LuZap /></div>
          <span>Tarik<span className="logo-dot">.</span></span>
        </motion.div>

        <div className="navbar-links">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.2, duration: 0.4, ease: [0.4, 0, 0, 1] }}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              {link.label}
            </motion.a>
          ))}
          <MagneticButton strength={0.25} cursorLabel="Start">
            <motion.a
              href="#contact"
              className="navbar-cta"
              onClick={(e) => handleNavClick(e, '#contact')}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, ease: [0.4, 0, 0, 1] }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.a>
          </MagneticButton>
        </div>

        <div
          className={`navbar-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          role="button"
          aria-label="Toggle menu"
          tabIndex={0}
        >
          <span /><span /><span />
        </div>
      </div>

      <div className={`navbar-mobile ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="btn btn-primary" onClick={(e) => handleNavClick(e, '#contact')}>
          Get Started
        </a>
      </div>
    </motion.nav>
  );
}
