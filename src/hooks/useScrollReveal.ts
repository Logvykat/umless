"use client";

import { useRef, useState, useEffect } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  delay?: number;
  immediate?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.8, delay = 0, immediate = false } = options;
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      const timer = setTimeout(() => setIsRevealed(true), 0);
      return () => clearTimeout(timer);
    }

    if (immediate) {
      const timer = setTimeout(() => setIsRevealed(true), delay);
      return () => clearTimeout(timer);
    }

    const mountTime = performance.now();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Only apply delay if intersection fires at/near mount (visible at load).
          // If user had to scroll to reach it, reveal immediately.
          const elapsed = performance.now() - mountTime;
          const shouldDelay = delay > 0 && elapsed < 100;
          if (shouldDelay) {
            setTimeout(() => setIsRevealed(true), delay);
          } else {
            setIsRevealed(true);
          }
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay, immediate]);

  return { ref, isRevealed };
}