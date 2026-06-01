import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that animates a number counting up from 0 to a target value.
 * Triggers when the element is scrolled into view.
 * @param {number} target - The target number to count up to
 * @param {number} duration - Duration of the animation in ms (default: 2000)
 * @returns {{ count: number, ref: React.RefObject }}
 */
export function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasTriggered, target, duration]);

  return { count, ref };
}
