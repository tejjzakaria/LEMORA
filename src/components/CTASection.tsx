import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import siteConfig from "@/config/siteConfig";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-gradient-hero relative overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />

      {/* Decorative Floating Elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-soft-pink/30 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-champagne/40 rounded-full blur-2xl pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-6">
              {t('cta.subtitle')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              {t('cta.title')}
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-10">
              {t('cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Link to="/shop" className="flex-1">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full group shadow-glow"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                    {t('cta.shopButton')}
                  </Button>
                </motion.div>
              </Link>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full group border-2 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                  >
                    <WhatsAppIcon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                    {t('cta.whatsappButton')}
                  </Button>
                </motion.div>
              </a>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default CTASection;
