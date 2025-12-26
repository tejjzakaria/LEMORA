import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function FadeInWhenVisible({
  children,
  delay = 0,
  direction = 'up',
}: FadeInWhenVisibleProps) {
  const { ref, inView } = useScrollAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      style={{ willChange: inView ? 'auto' : 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
