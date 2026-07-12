import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function BlurText({ text, className = '', delay = 0 }: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  
  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={
            prefersReduced
              ? { opacity: 0 }
              : { filter: 'blur(8px)', opacity: 0, y: 25 }
          }
          animate={
            isInView
              ? prefersReduced
                ? { opacity: 1 }
                : { filter: 'blur(0px)', opacity: 1, y: 0 }
              : {}
          }
          transition={{
            duration: prefersReduced ? 0.35 : 0.6,
            ease: 'easeOut',
            delay: prefersReduced ? delay : delay + (i * 60) / 1000
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            willChange: prefersReduced ? 'opacity' : 'transform, opacity, filter'
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
