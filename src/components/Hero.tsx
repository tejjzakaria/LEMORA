import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useLanguage();

  // Product images for floating circles
  const productImages = [
    "https://lemoracosmetics.com/cdn/shop/files/MOCKUP4.png?v=1745189016&width=533",
    "https://lemoracosmetics.com/cdn/shop/files/IMG_9845_1.jpg?v=1713770822&width=533",
    "https://lemoracosmetics.com/cdn/shop/files/IMG_6695_1.jpg?v=1708824310&width=533",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero-bold bg-gradient-animated animate-gradient-shift" />

      {/* Parallax Background Image */}
      <ParallaxSection speed={0.5}>
        <div className="absolute inset-0">
          <img
            src="/hero.webp"
            alt="Lemora Cosmetics luxury products collection"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </ParallaxSection>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />

      {/* Floating Product Preview Circles */}
      <motion.div
        className="hidden lg:block absolute top-1/4 right-1/4 w-40 h-40 rounded-full overflow-hidden shadow-glow-intense opacity-90"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src={productImages[0]}
          alt="Product preview"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        className="hidden lg:block absolute bottom-1/4 right-1/3 w-32 h-32 rounded-full overflow-hidden shadow-glow opacity-80"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <img
          src={productImages[1]}
          alt="Product preview"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-32">
        <div className="max-w-2xl">
          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-6"
          >
            {t('hero.subtitle')}
          </motion.span>

          {/* Title with Staggered Animation */}
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-foreground mb-6">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-primary"
            >
              {t('hero.title')}
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mb-10"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/shop">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" size="lg" className="group shadow-glow">
                  {t('hero.primaryCta')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/about">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg">
                  {t('hero.secondaryCta')}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Floating Gradient Blob */}
      <motion.div
        className="hidden lg:block absolute left-20 top-1/3 w-96 h-96 rounded-full bg-soft-pink/40 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-rose-gold/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </section>
  );
};

export default Hero;
