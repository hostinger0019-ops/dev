import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import './CustomCursor.css';

const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };

export default function CustomCursor() {
  const { hovered, label } = useCursor();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check for touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={`custom-cursor ${hovered ? 'hovered' : ''}`}
      style={{ x, y }}
    >
      <span className="custom-cursor-label">{label}</span>
    </motion.div>
  );
}
