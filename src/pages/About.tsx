import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { Card } from "@/components/ui/card";
import { Leaf, Heart, Award, Sparkles } from "lucide-react";
import siteConfig from "@/config/siteConfig";
import CTASection from "@/components/CTASection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

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
        className="font-heading text-4xl md:text-5xl text-primary block"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {count}{suffix}
      </motion.span>
      <p className="font-body text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}

const About = () => {
  const { about, siteName } = siteConfig;
  const { t } = useLanguage();

  const valueIcons = {
    "Natural Ingredients": Leaf,
    "Cruelty-Free": Heart,
    "Sustainability": Sparkles,
    "Quality First": Award,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-hero-bold bg-gradient-animated animate-gradient-shift relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 rounded-full bg-rose-gold/20 blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-6">
                {t('aboutPage.heroSubtitle')}
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {t('aboutPage.heroTitle')}
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('aboutPage.heroDescription')} {siteName}
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 overflow-hidden relative">
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
                      alt={`${siteName} brand story`}
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
                <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                  {t('aboutPage.storyTitle')}
                </h2>
                <div className="space-y-4">
                  <p className="font-body text-lg text-muted-foreground leading-relaxed">
                    {t('aboutPage.storyParagraphs.0')}
                  </p>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed">
                    {t('aboutPage.storyParagraphs.1')}
                  </p>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed">
                    {t('aboutPage.storyParagraphs.2')}
                  </p>
                </div>

                {/* Animated Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 mt-8 border-t border-border">
                  <AnimatedStat
                    value={about.stats[0].value}
                    suffix={about.stats[0].suffix}
                    label={t('aboutPage.stats.products')}
                  />
                  <AnimatedStat
                    value={about.stats[1].value}
                    suffix={about.stats[1].suffix}
                    label={t('aboutPage.stats.natural')}
                  />
                  <AnimatedStat
                    value={about.stats[2].value}
                    suffix={about.stats[2].suffix}
                    label={t('aboutPage.stats.customers')}
                  />
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl mb-6">{t('aboutPage.missionTitle')}</h2>
              <p className="font-body text-xl text-muted-foreground leading-relaxed">
                {t('aboutPage.missionText')}
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl mb-4">{t('aboutPage.valuesTitle')}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('aboutPage.valuesSubtitle')}
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((index) => {
              const icons = [Leaf, Heart, Sparkles, Award];
              const Icon = icons[index];
              return (
                <FadeInWhenVisible key={index} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                    <Card className="p-6 h-full border-0 shadow-card hover:shadow-hover transition-all duration-300 group">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-rose flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-heading text-xl mb-3 group-hover:text-primary transition-colors">
                          {t(`aboutPage.values.${index}.title`)}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(`aboutPage.values.${index}.description`)}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </FadeInWhenVisible>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default About;
