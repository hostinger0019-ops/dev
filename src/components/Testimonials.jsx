import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronLeft, LuChevronRight, LuStar } from 'react-icons/lu';
import { useCursor } from '../context/CursorContext';
import SplitText from './SplitText';
import './Testimonials.css';

const ease = [0.4, 0, 0, 1];

const testimonials = [
  { text: "Tarik Services ne humari online presence banane mein bahut help ki. Pehle humara koi website nahi tha, ab customers directly contact karte hain. Simple aur professional kaam kiya inhone.", name: 'Rohit Sharma', role: 'Owner, Spice Junction — Delhi', initials: 'RS', avatarClass: 'testimonial-avatar-1', stars: 5 },
  { text: "Maine socha tha website banana mushkil hoga, lekin Tarik ne sab easy kar diya. Booking system laga diya, ab clients khud appointment book kar lete hain. Bahut smooth experience raha.", name: 'Priya Malhotra', role: 'Founder, Glow Studio — Jaipur', initials: 'PM', avatarClass: 'testimonial-avatar-2', stars: 5 },
  { text: "Budget tight tha lekin Tarik ne usme bhi achi website bana di. Admin panel diya, payment gateway lagaya — sab kuch manage karna easy ho gaya. Supportive team hai, har doubt clear kiya.", name: 'Ankit Verma', role: 'Founder, Urban Thread — Chandigarh', initials: 'AV', avatarClass: 'testimonial-avatar-3', stars: 5 },
  { text: "Pehle sirf word of mouth se kaam chalata tha. Website banayi toh Google pe dikhne laga. Ab log search karke direct call karte hain. Isse better investment nahi ho sakti business ke liye.", name: 'Amit Gupta', role: 'Director, Gupta Properties — Noida', initials: 'AG', avatarClass: 'testimonial-avatar-4', stars: 5 },
];

/* Blur-to-focus animation */
const blurFocus = {
  enter: { opacity: 0, filter: 'blur(12px)', scale: 0.97 },
  center: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit: { opacity: 0, filter: 'blur(12px)', scale: 0.97 },
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { setCursorHovered, setCursorLabel } = useCursor();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="section-label">Testimonials</span>
          <SplitText
            text="What Our Clients Say"
            as="h2"
            className="section-title"
            variant="fadeBlur"
            center
            stagger={0.06}
          />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Don&apos;t just take our word for it — hear from the businesses
            we&apos;ve helped transform.
          </p>
        </motion.div>

        <motion.div
          className="testimonials-carousel"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="testimonial-card"
              variants={blurFocus}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease }}
            >
              <div className="testimonial-quote-icon">&ldquo;</div>
              <div className="testimonial-stars">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <LuStar key={i} className="testimonial-star" fill="#FFD700" />
                ))}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className={`testimonial-avatar ${t.avatarClass}`}>{t.initials}</div>
                <div className="testimonial-author-info">
                  <div className="testimonial-author-name">{t.name}</div>
                  <div className="testimonial-author-role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonials-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonials-dot ${index === current ? 'active' : ''}`}
                onClick={() => setCurrent(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="testimonials-arrows">
            <button
              className="testimonials-arrow"
              onClick={prev}
              aria-label="Previous"
              onMouseEnter={() => { setCursorHovered(true); setCursorLabel(''); }}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <LuChevronLeft />
            </button>
            <button
              className="testimonials-arrow"
              onClick={next}
              aria-label="Next"
              onMouseEnter={() => { setCursorHovered(true); setCursorLabel(''); }}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <LuChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
