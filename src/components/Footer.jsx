import { motion } from 'framer-motion';
import {
  LuZap,
  LuGithub,
  LuLinkedin,
  LuTwitter,
  LuInstagram,
} from 'react-icons/lu';
import './Footer.css';

const ease = [0.4, 0, 0, 1];

const footerLinks = {
  services: [
    { label: 'Web Development', href: '#services' },
    { label: 'App Development', href: '#services' },
    { label: 'UI/UX Design', href: '#services' },
    { label: 'Digital Strategy', href: '#services' },
    { label: 'E-Commerce', href: '#services' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'FAQs', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Status Page', href: '#' },
  ],
};

const socials = [
  { icon: <LuGithub />, label: 'GitHub' },
  { icon: <LuLinkedin />, label: 'LinkedIn' },
  { icon: <LuTwitter />, label: 'Twitter' },
  { icon: <LuInstagram />, label: 'Instagram' },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export default function Footer() {
  const handleClick = (e, href) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div className="footer-brand" variants={fadeUp}>
            <div className="footer-logo">
              <div className="logo-icon"><LuZap /></div>
              <span>Tarik<span className="logo-dot">.</span></span>
            </div>
            <p className="footer-description">
              We craft exceptional digital experiences that transform businesses
              and delight users.
            </p>
            <div className="footer-socials">
              {socials.map((social, index) => (
                <button key={index} className="footer-social" aria-label={social.label}>
                  {social.icon}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div className="footer-column" variants={fadeUp}>
            <h4>Services</h4>
            <div className="footer-links">
              {footerLinks.services.map((link, i) => (
                <a key={i} href={link.href} onClick={(e) => handleClick(e, link.href)}>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div className="footer-column" variants={fadeUp}>
            <h4>Company</h4>
            <div className="footer-links">
              {footerLinks.company.map((link, i) => (
                <a key={i} href={link.href} onClick={(e) => handleClick(e, link.href)}>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div className="footer-column" variants={fadeUp}>
            <h4>Support</h4>
            <div className="footer-links">
              {footerLinks.support.map((link, i) => (
                <a key={i} href={link.href} onClick={(e) => handleClick(e, link.href)}>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, ease }}
        >
          <p className="footer-copyright">
            © {new Date().getFullYear()}{' '}
            <a href="#hero" onClick={(e) => handleClick(e, '#hero')}>Tarik Services</a>
            . All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
