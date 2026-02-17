import { motion } from 'framer-motion';
import { Star, ShieldCheck } from 'lucide-react';
import { FadeInWhenVisible } from './animations/FadeInWhenVisible';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductTestimonials() {
  const { t } = useLanguage();
  const reviewCount = 13;

  const scrollToCheckout = () => {
    const checkoutSection = document.getElementById('checkout');
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 md:mb-4 px-4">
              {t('singleProduct.testimonials.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground px-4">
              {t('singleProduct.testimonials.description')}
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-3xl font-bold text-foreground">5.0 {t('singleProduct.testimonials.rating')}</p>
            <p className="text-muted-foreground">{t('singleProduct.testimonials.basedOn', { count: reviewCount })}</p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: 13 }).map((_, index) => (
            <FadeInWhenVisible key={index} delay={(index % 3) * 0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-card hover:shadow-hover transition-all duration-300 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{t(`singleProduct.testimonials.reviews.${index}.text`)}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {t(`singleProduct.testimonials.reviews.${index}.name`).charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {t(`singleProduct.testimonials.reviews.${index}.name`)}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <ShieldCheck className="w-4 h-4" />
                      {t('singleProduct.testimonials.verifiedPurchase')}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible delay={0.8}>
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-6">
              {t('singleProduct.testimonials.cta')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCheckout}
              className="bg-gradient-rose text-white px-8 py-4 rounded-full font-semibold text-lg shadow-glow hover:shadow-glow-intense transition-all duration-300"
            >
              {t('singleProduct.testimonials.ctaButton')}
            </motion.button>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
