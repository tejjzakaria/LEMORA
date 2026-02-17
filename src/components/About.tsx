import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

// Animated Counter Component
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <motion.span
        className="font-heading text-4xl text-primary block"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {count}{suffix}
      </motion.span>
      <p className="font-body text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 bg-background overflow-hidden relative">
      {/* Background Blobs */}
      <motion.div
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-soft-pink/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Parallax Image */}
          <FadeInWhenVisible direction="left">
            <div className="relative">
              <ParallaxSection speed={0.3}>
                <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-card">
                  <img
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80"
                    alt="Floriya Cosmetics brand story"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ParallaxSection>

              {/* Animated Decorative Blobs */}
              <motion.div
                className="absolute -bottom-8 -right-8 w-48 h-48 bg-soft-pink/50 rounded-full blur-3xl -z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -top-8 -left-8 w-32 h-32 bg-champagne rounded-full blur-2xl -z-10"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </FadeInWhenVisible>

          {/* Content */}
          <FadeInWhenVisible delay={0.2} direction="right">
            <div className="lg:pl-8">
              <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-6">
                {t('about.subtitle')}
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                {t('about.title')}
              </h2>
              <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
                {t('about.description')}
              </p>

              {/* Values */}
              <div className="space-y-2 mb-8">
                {['about.values.0', 'about.values.1', 'about.values.2', 'about.values.3'].map((key, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="font-body text-muted-foreground">{t(key)}</p>
                  </div>
                ))}
              </div>

              <Link to="/about">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block px-6 py-3 bg-gradient-rose text-white text-sm tracking-wider uppercase rounded-sm shadow-glow font-body mb-8"
                >
                  {t('about.learnMore')}
                </motion.div>
              </Link>

              {/* Animated Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                <AnimatedStat value={50} suffix="+" label={t('about.subtitle')} />
                <AnimatedStat value={100} suffix="%" label={t('about.values.0')} />
                <AnimatedStat value={25} suffix="k+" label="Happy Customers" />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default About;
