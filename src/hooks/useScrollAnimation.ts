import { useInView } from 'react-intersection-observer';

export function useScrollAnimation(threshold = 0.2) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return { ref, inView };
}
