import { useInView } from 'react-intersection-observer';

export function useScrollAnimation(threshold = 0.05) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
    rootMargin: '100px 0px', // Trigger animation 100px before element enters viewport
    fallbackInView: true, // Fallback for browsers that don't support IntersectionObserver
  });

  return { ref, inView };
}
