import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LuMail, LuMapPin, LuPhone, LuSend,
  LuGithub, LuLinkedin, LuTwitter, LuInstagram,
} from 'react-icons/lu';
import { useCursor } from '../context/CursorContext';
import SplitText from './SplitText';
import './Contact.css';

const ease = [0.4, 0, 0, 1];

const contactInfo = [
  { icon: <LuMail />, label: 'Email', value: 'hello@tarikservices.com' },
  { icon: <LuPhone />, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: <LuMapPin />, label: 'Location', value: 'San Francisco, CA' },
];

const socials = [
  { icon: <LuGithub />, label: 'GitHub' },
  { icon: <LuLinkedin />, label: 'LinkedIn' },
  { icon: <LuTwitter />, label: 'Twitter' },
  { icon: <LuInstagram />, label: 'Instagram' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', budget: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setCursorHovered, setCursorLabel } = useCursor();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', budget: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="section-label">Get In Touch</span>
            <SplitText
              text="Let's Build Something Amazing"
              as="h2"
              className="section-title"
              variant="slideUp"
              stagger={0.05}
            />
            <p className="section-subtitle">
              Ready to transform your digital presence? Reach out and let&apos;s
              make it happen.
            </p>

            <div className="contact-info">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="contact-info-item"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * index + 0.2, duration: 0.5, ease }}
                >
                  <div className="contact-info-icon">{item.icon}</div>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact-socials">
              {socials.map((social, index) => (
                <button
                  key={index}
                  className="contact-social"
                  aria-label={social.label}
                  onMouseEnter={() => { setCursorHovered(true); setCursorLabel(''); }}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Form with spring entrance */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="form-group">
                  <input type="text" name="name" className="form-input" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" className="form-input" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="contact-form-row">
                <div className="form-group">
                  <input type="text" name="subject" className="form-input" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <input type="text" name="budget" className="form-input" placeholder="Budget Range" value={formData.budget} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <textarea name="message" className="form-textarea" placeholder="Tell us about your project..." value={formData.message} onChange={handleChange} required />
              </div>
              <button
                type="submit"
                className="contact-submit"
                disabled={isSubmitting}
                onMouseEnter={() => { setCursorHovered(true); setCursorLabel('Send'); }}
                onMouseLeave={() => { setCursorHovered(false); setCursorLabel(''); }}
              >
                {isSubmitting ? 'Sending...' : isSubmitted ? '✓ Message Sent!' : (
                  <>Send Message <LuSend style={{ marginLeft: 6 }} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
