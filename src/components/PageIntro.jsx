import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuZap } from 'react-icons/lu';
import './PageIntro.css';

const ease = [0.4, 0, 0, 1];

export default function PageIntro({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scroll during intro
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      onComplete?.();
    }, 2200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="page-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.6, ease },
          }}
        >
          {/* Logo */}
          <motion.div
            className="page-intro-logo"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <div className="logo-icon"><LuZap /></div>
            <span>Tarik<span className="logo-dot">.</span></span>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="page-intro-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <motion.div
              className="page-intro-bar-fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease, delay: 0.7 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
