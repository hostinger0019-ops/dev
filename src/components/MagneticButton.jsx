import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const springConfig = { damping: 15, stiffness: 300, mass: 0.2 };

export default function MagneticButton({
  children,
  strength = 0.3,
  className = '',
  cursorLabel = '',
  ...props
}) {
  const ref = useRef(null);
  const { setCursorHovered, setCursorLabel } = useCursor();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setCursorHovered(false);
    setCursorLabel('');
  };

  const handleMouseEnter = () => {
    setCursorHovered(true);
    if (cursorLabel) setCursorLabel(cursorLabel);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: xSpring, y: ySpring, display: 'inline-flex' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.div>
  );
}
