import { motion } from "framer-motion";
import { Droplet, Leaf, Sparkles, Heart } from "lucide-react";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";

const IngredientsSpotlight = () => {
  const { t } = useLanguage();

  const ingredients = [
    {
      icon: Droplet,
      title: t('ingredients.items.0.title'),
      description: t('ingredients.items.0.description'),
      benefits: t('ingredients.items.0.benefits'),
      gradient: "from-amber-400 to-yellow-600",
    },
    {
      icon: Leaf,
      title: t('ingredients.items.1.title'),
      description: t('ingredients.items.1.description'),
      benefits: t('ingredients.items.1.benefits'),
      gradient: "from-green-400 to-emerald-600",
    },
    {
      icon: Sparkles,
      title: t('ingredients.items.2.title'),
      description: t('ingredients.items.2.description'),
      benefits: t('ingredients.items.2.benefits'),
      gradient: "from-purple-400 to-pink-600",
    },
    {
      icon: Heart,
      title: t('ingredients.items.3.title'),
      description: t('ingredients.items.3.description'),
      benefits: t('ingredients.items.3.benefits'),
      gradient: "from-rose-400 to-red-600",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-subtle relative overflow-hidden">
      {/* Decorative Blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-champagne/20 blur-3xl pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              {t('ingredients.subtitle')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              {t('ingredients.title')}
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              {t('ingredients.description')}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {ingredients.map((ingredient, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <motion.div
                className="relative bg-card border border-border rounded-lg p-8 shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden group"
                whileHover={{ y: -8 }}
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${ingredient.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div className="relative flex justify-center mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${ingredient.gradient} flex items-center justify-center shadow-glow`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ingredient.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="font-heading text-xl text-foreground mb-3 text-center">
                    {ingredient.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 text-center leading-relaxed">
                    {ingredient.description}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-border my-4"></div>

                  {/* Benefits */}
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="font-body text-xs text-foreground leading-relaxed">
                      {ingredient.benefits}
                    </p>
                  </div>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientsSpotlight;
