import { motion } from "framer-motion";
import { Leaf, Award, Heart, Truck, Shield, RotateCcw } from "lucide-react";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustBadges = () => {
  const { t } = useLanguage();

  const badges = [
    {
      icon: Leaf,
      title: t('trustBadges.natural.title'),
      description: t('trustBadges.natural.description'),
    },
    {
      icon: Award,
      title: t('trustBadges.quality.title'),
      description: t('trustBadges.quality.description'),
    },
    {
      icon: Heart,
      title: t('trustBadges.crueltyFree.title'),
      description: t('trustBadges.crueltyFree.description'),
    },
    {
      icon: Truck,
      title: t('trustBadges.freeShipping.title'),
      description: t('trustBadges.freeShipping.description'),
    },
    {
      icon: Shield,
      title: t('trustBadges.secure.title'),
      description: t('trustBadges.secure.description'),
    },
    {
      icon: RotateCcw,
      title: t('trustBadges.returns.title'),
      description: t('trustBadges.returns.description'),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <FadeInWhenVisible key={badge.title} delay={index * 0.1}>
              <motion.div
                className="flex flex-col items-center text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-rose flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <badge.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-heading text-sm md:text-base text-foreground mb-2">
                  {badge.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  {badge.description}
                </p>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
