import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { mainProduct } from '@/lib/singleProduct';

export default function SingleProductCTA() {
  const { t, isRTL } = useLanguage();

  const scrollToCheckout = () => {
    const checkoutSection = document.getElementById('checkout');
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="max-w-4xl mx-auto bg-gradient-rose rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-glow-intense overflow-hidden relative"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center text-white">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t('singleProduct.cta.limitedOffer')}</span>
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3 md:mb-4">
              {t('singleProduct.cta.title')}
            </h3>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
              {t('singleProduct.cta.description')}
            </p>

            {/* CTA Button */}
            <Button
              onClick={scrollToCheckout}
              className={`bg-white text-primary hover:bg-white/90 font-bold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group active:scale-95 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('singleProduct.cta.button', { price: mainProduct.price })}
              <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 ${isRTL ? 'mr-2 group-hover:-translate-x-1 rotate-180' : 'ml-2 group-hover:translate-x-1'} transition-transform`} />
            </Button>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8 text-xs md:text-sm text-white/80">
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('singleProduct.trustBadges.freeShipping')}
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('singleProduct.checkout.cod')}
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('singleProduct.trustBadges.returns')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
