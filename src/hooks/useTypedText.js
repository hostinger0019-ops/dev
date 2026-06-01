import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that creates a typewriter effect cycling through an array of strings.
 * @param {string[]} words - Array of strings to cycle through
 * @param {object} options - Configuration options
 * @param {number} options.typeSpeed - Milliseconds per character typed (default: 80)
 * @param {number} options.deleteSpeed - Milliseconds per character deleted (default: 50)
 * @param {number} options.pauseDuration - Milliseconds to pause after typing a word (default: 2000)
 */
export function useTypedText(words, options = {}) {
  const {
    typeSpeed = 80,
    deleteSpeed = 50,
    pauseDuration = 2000,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (isPaused) return;

    if (isDeleting) {
      setDisplayText(prev => currentWord.substring(0, prev.length - 1));
    } else {
      setDisplayText(prev => currentWord.substring(0, prev.length + 1));
    }
  }, [words, wordIndex, isDeleting, isPaused]);

  useEffect(() => {
    const currentWord = words[wordIndex];

    // Word fully typed — pause then start deleting
    if (!isDeleting && displayText === currentWord) {
      setIsPaused(true);
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    // Word fully deleted — move to next word
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setWordIndex(prev => (prev + 1) % words.length);
      return;
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isPaused, wordIndex, words, typeSpeed, deleteSpeed, pauseDuration, tick]);

  return displayText;
}
