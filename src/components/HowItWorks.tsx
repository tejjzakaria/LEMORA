import { motion } from "framer-motion";
import { Search, ShoppingCart, MessageCircle, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t('howItWorks.steps.0.title'),
      description: t('howItWorks.steps.0.description'),
    },
    {
      icon: ShoppingCart,
      title: t('howItWorks.steps.1.title'),
      description: t('howItWorks.steps.1.description'),
    },
    {
      icon: WhatsAppIcon,
      title: t('howItWorks.steps.2.title'),
      description: t('howItWorks.steps.2.description'),
    },
    {
      icon: Truck,
      title: t('howItWorks.steps.3.title'),
      description: t('howItWorks.steps.3.description'),
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-hero relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 rounded-full bg-soft-pink/30 blur-3xl pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              {t('howItWorks.subtitle')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              {t('howItWorks.description')}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.15}>
              <motion.div
                className="relative bg-card/80 backdrop-blur-sm border border-border rounded-lg p-8 shadow-card hover:shadow-hover transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-rose flex items-center justify-center shadow-glow">
                  <span className="font-heading text-xl text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6 mt-4">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-subtle flex items-center justify-center border-2 border-primary/20"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <step.icon className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl text-foreground mb-3 text-center">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Connector Line (not on last item on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
