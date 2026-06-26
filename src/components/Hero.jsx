import { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LuArrowRight, LuPlay } from 'react-icons/lu';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTypedText } from '../hooks/useTypedText';
import { useCursor } from '../context/CursorContext';
import SplitText, { SplitWord } from './SplitText';
import MagneticButton from './MagneticButton';
import heroMockup from '../assets/hero-mockup.png';
import heroBgImg from '../assets/hero-bg.png';
import BookingModal from './BookingModal';
import './Hero.css';

const serviceWords = [
  'Website Development',
  'App Development',
  'UI/UX Design',
  'Digital Strategy',
  'E-Commerce Solutions',
];

const ease = [0.4, 0, 0, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

export default function Hero({ introComplete }) {
  const [showBooking, setShowBooking] = useState(false);
  const typedText = useTypedText(serviceWords, {
    typeSpeed: 70,
    deleteSpeed: 40,
    pauseDuration: 2200,
  });

  const heroRef = useRef(null);
  const { setCursorHovered, setCursorLabel } = useCursor();

  const handleMouseMove = useCallback((e) => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    hero.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particleOptions = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 60,
    particles: {
      number: { value: 35, density: { enable: true, width: 1200, height: 800 } },
      color: { value: ['#7C6FFF', '#C084FC'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.04, max: 0.15 },
        animation: { enable: true, speed: 0.3, sync: false },
      },
      size: { value: { min: 0.5, max: 1.5 } },
      move: {
        enable: true,
        speed: 0.25,
        direction: 'none',
        random: true,
        straight: false,
        outModes: 'out',
      },
      links: {
        enable: true,
        distance: 120,
        color: '#7C6FFF',
        opacity: 0.03,
        width: 1,
      },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' } },
      modes: { grab: { distance: 120, links: { opacity: 0.08 } } },
    },
    detectRetina: true,
  }), []);

  const handleCursorEnter = () => {
    setCursorHovered(true);
    setCursorLabel('');
  };

  const handleCursorLeave = () => {
    setCursorHovered(false);
    setCursorLabel('');
  };

  return (
    <section
      className="hero"
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* Premium Background Image */}
      <div className="hero-bg-image">
        <img src={heroBgImg} alt="" aria-hidden="true" />
      </div>

      {/* Aurora Blobs */}
      <div className="hero-aurora">
        <div className="hero-aurora-blob hero-aurora-1" />
        <div className="hero-aurora-blob hero-aurora-2" />
        <div className="hero-aurora-blob hero-aurora-3" />
      </div>

      <div className="hero-title-glow" />
      <div className="hero-grid" />
      <div className="hero-beam hero-beam-1" />
      <div className="hero-beam hero-beam-2" />
      <div className="hero-vbeam hero-vbeam-1" />
      <div className="hero-vbeam hero-vbeam-2" />

      <Particles
        className="hero-particles"
        init={particlesInit}
        options={particleOptions}
      />

      {/* Content */}
      <motion.div
        className="hero-content"
        variants={stagger}
        initial="hidden"
        animate={introComplete ? 'visible' : 'hidden'}
      >
        <motion.div className="hero-badge" variants={fadeUp}>
          <span className="hero-badge-dot" />
          Available for new projects
        </motion.div>

        {/* Split Text Hero Title */}
        <SplitText
          as="h1"
          className="hero-title"
          variant="slideUp"
          trigger={introComplete ? 'animate' : 'inView'}
          stagger={0.05}
          delay={0.4}
          center
        >
          <SplitWord>We</SplitWord>
          <SplitWord>Build</SplitWord>
          <SplitWord>Digital</SplitWord>
          <SplitWord className="hero-highlight-wrapper">
            <span className="hero-highlight">Experiences</span>
          </SplitWord>
          <SplitWord>That</SplitWord>
          <SplitWord>Matter</SplitWord>
        </SplitText>

        <motion.div className="hero-typed-wrapper" variants={fadeUp}>
          <span className="hero-typed-label">Specializing in</span>
          <span className="hero-typed-text">
            {typedText}
            <span className="hero-cursor" />
          </span>
        </motion.div>

        <motion.div className="hero-buttons" variants={fadeUp}>
          <MagneticButton cursorLabel="Book">
            <motion.button
              className="btn btn-primary btn-book-slot"
              whileTap={{ scale: 0.97 }}
              onMouseEnter={handleCursorEnter}
              onMouseLeave={handleCursorLeave}
              onClick={() => setShowBooking(true)}
            >
              🔥 Book the Slot Now
              <LuArrowRight className="hero-btn-icon" />
            </motion.button>
          </MagneticButton>
          <MagneticButton cursorLabel="View">
            <motion.a
              href="#portfolio"
              className="btn btn-secondary"
              whileTap={{ scale: 0.97 }}
              onMouseEnter={handleCursorEnter}
              onMouseLeave={handleCursorLeave}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <LuPlay className="hero-btn-icon" />
              View Our Work
            </motion.a>
          </MagneticButton>
        </motion.div>

        <motion.p className="hero-description" variants={fadeUp}>
          We craft stunning digital products that captivate users, drive growth,
          and transform ideas into reality. Your vision, our expertise.
        </motion.p>

        {/* Hero Mockup */}
        <motion.div className="hero-mockup-wrapper" variants={fadeUp}>
          <div className="hero-mockup-glow" />
          <div
            className="hero-mockup"
            onMouseEnter={() => { setCursorHovered(true); setCursorLabel('View'); }}
            onMouseLeave={handleCursorLeave}
          >
            <img
              src={heroMockup}
              alt="Premium dashboard built by Tarik Services"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div className="hero-stats" variants={fadeUp}>
          {[
            { num: '150', sym: '+', label: 'Projects' },
            { num: '50', sym: '+', label: 'Clients' },
            { num: '5', sym: '+', label: 'Years' },
            { num: '99', sym: '%', label: 'Satisfaction' },
          ].map((s, i) => (
            <div className="hero-stat" key={i}>
              <div className="hero-stat-number">{s.num}<span>{s.sym}</span></div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 0.4 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </section>
  );
}
