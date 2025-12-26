import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast({
        title: t('newsletter.successMessage'),
        description: t('newsletter.description'),
      });
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-hero relative overflow-hidden">
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
              {t('newsletter.subtitle')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-10">
              {t('newsletter.description')}
            </p>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletter.emailPlaceholder')}
                    className="flex-1 h-14 px-6 bg-card border border-border rounded-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 4px hsl(var(--primary) / 0.1)",
                    }}
                    required
                  />
                  <Button variant="hero" size="lg" type="submit" className="group shadow-glow">
                    {t('newsletter.subscribeCta')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-rose flex items-center justify-center mb-6 shadow-glow"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-heading mb-2">{t('newsletter.successMessage')}</h3>
                  <p className="text-muted-foreground">
                    {t('newsletter.description')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!isSubmitted && (
              <motion.p
                className="font-body text-xs text-muted-foreground mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t('newsletter.privacyNote')}
              </motion.p>
            )}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default Newsletter;
