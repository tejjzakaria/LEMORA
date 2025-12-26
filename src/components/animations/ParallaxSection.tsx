import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';
import { ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
}

export function ParallaxSection({ children, speed = 0.5 }: ParallaxSectionProps) {
  const y = useParallax(speed);

  return <motion.div style={{ y }}>{children}</motion.div>;
}
