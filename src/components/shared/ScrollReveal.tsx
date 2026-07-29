"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const directionClass = {
  up: 'reveal',
  left: 'reveal-l',
  right: 'reveal-r'
};

export default function ScrollReveal({ children, direction = 'up', delay = 0, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Content starts at opacity:0, so any path where the observer never fires
    // leaves the page permanently blank. Each guard below closes one of those paths.

    // 1. No IntersectionObserver support — reveal rather than hide forever.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // 2. Respect reduced-motion: skip the animation entirely.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    // 3. threshold MUST stay 0. A fractional threshold means "N% of the element
    //    must be on screen" — unreachable when the element is taller than the
    //    viewport. The previous 0.12 needed 994px visible on an 8284px article
    //    wrapper, so every service and guide page rendered blank. threshold:0
    //    fires on the first visible pixel, at any element height.
    //    rootMargin preserves the slight delay so the reveal still feels intentional.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -64px 0px' }
    );
    observer.observe(el);

    // 4. Last-resort timer: whatever happens, content becomes visible.
    const failsafe = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${directionClass[direction]} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
