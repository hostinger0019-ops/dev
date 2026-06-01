import { motion } from 'framer-motion';
import './SplitText.css';

const ease = [0.4, 0, 0, 1];

const defaultContainer = {
  hidden: { opacity: 1 },
  visible: (stagger = 0.04) => ({
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  }),
};

const slideUp = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.5, ease },
  },
};

const fadeBlur = {
  hidden: { y: 20, opacity: 0, filter: 'blur(8px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease },
  },
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease },
  },
};

const VARIANTS = {
  slideUp,
  fadeBlur,
  scaleIn,
};

// Pre-create motion components to avoid re-creating on every render
const motionComponents = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  div: motion.div,
};

export default function SplitText({
  text,
  as: Tag = 'h2',
  className = '',
  variant = 'slideUp',
  center = false,
  once = true,
  stagger = 0.04,
  trigger = 'inView',
  delay = 0,
  children,
}) {
  const MotionTag = motionComponents[Tag] || motion.div;
  const wordVariant = VARIANTS[variant] || slideUp;

  // If children are provided, render them directly (for gradient text etc.)
  if (children) {
    return (
      <MotionTag
        className={`split-text ${center ? 'split-text-center' : ''} ${className}`}
        initial="hidden"
        {...(trigger === 'inView'
          ? { whileInView: 'visible', viewport: { once, margin: '-60px' } }
          : { animate: 'visible' }
        )}
        custom={stagger}
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
      >
        {children}
      </MotionTag>
    );
  }

  const words = text.split(' ');

  return (
    <MotionTag
      className={`split-text ${center ? 'split-text-center' : ''} ${className}`}
      initial="hidden"
      {...(trigger === 'inView'
        ? { whileInView: 'visible', viewport: { once, margin: '-60px' } }
        : { animate: 'visible' }
      )}
      custom={stagger}
      variants={defaultContainer}
    >
      {words.map((word, i) => (
        <span key={i} className="split-word-wrapper">
          <motion.span className="split-word" variants={wordVariant}>
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="split-space" />}
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * SplitWord — For use inside SplitText with children
 * Wraps a word/element in the clip-reveal animation
 */
export function SplitWord({ children, variant = 'slideUp', className = '' }) {
  const wordVariant = VARIANTS[variant] || slideUp;
  return (
    <span className={`split-word-wrapper ${className}`}>
      <motion.span className="split-word" variants={wordVariant}>
        {children}
      </motion.span>
      <span className="split-space" />
    </span>
  );
}
