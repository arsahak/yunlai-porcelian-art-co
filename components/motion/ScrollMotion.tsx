'use client';

import { motion, useInView, UseInViewOptions, Variants } from 'framer-motion';
import { useRef } from 'react';

type AnimationType = 'fade-up' | 'fade-in' | 'scale-up' | 'slide-right' | 'slide-left';

interface ScrollMotionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  viewport?: UseInViewOptions;
}

const variants: Record<AnimationType, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

const ScrollMotion = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = '',
  viewport = { once: true, margin: "-100px" }
}: ScrollMotionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[animation]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollMotion;
