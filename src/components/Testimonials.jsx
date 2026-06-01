import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronLeft, LuChevronRight, LuStar } from 'react-icons/lu';
import { useCursor } from '../context/CursorContext';
import SplitText from './SplitText';
import './Testimonials.css';

const ease = [0.4, 0, 0, 1];

const testimonials = [
  { text: "Tarik Services transformed our vision into a stunning digital platform. Their attention to detail and creative approach exceeded all expectations. The team was responsive, professional, and delivered beyond what we imagined.", name: 'Sarah Chen', role: 'CEO, FinVault', initials: 'SC', avatarClass: 'testimonial-avatar-1', stars: 5 },
  { text: "Working with Tarik was a game-changer for our mobile app. They understood our requirements perfectly and delivered an app that our users absolutely love. The performance and design quality are outstanding.", name: 'Marcus Johnson', role: 'CTO, FitPulse', initials: 'MJ', avatarClass: 'testimonial-avatar-2', stars: 5 },
  { text: "The e-commerce platform they built for us increased our conversion rate by 40%. Their UI/UX design expertise is unmatched. They didn't just build a store — they built a complete shopping experience.", name: 'Elena Rodriguez', role: 'Founder, Bloom Fashion', initials: 'ER', avatarClass: 'testimonial-avatar-3', stars: 5 },
  { text: "Tarik Services is our go-to partner for all things digital. From strategy to execution, they consistently deliver exceptional results. Their proactive approach to problem-solving sets them apart.", name: 'David Park', role: 'VP Engineering, NexusAI', initials: 'DP', avatarClass: 'testimonial-avatar-4', stars: 5 },
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
