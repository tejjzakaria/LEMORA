import { motion } from 'framer-motion';
import { FadeInWhenVisible } from './animations/FadeInWhenVisible';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HowToUse() {
  const { t } = useLanguage();

  const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];

  return (
    <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 md:mb-4 px-4">
              {t('singleProduct.howToUse.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground px-4">
              {t('singleProduct.howToUse.description')}
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <FadeInWhenVisible key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-border"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center text-white font-bold text-lg shadow-glow">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-lg text-foreground pt-2 leading-relaxed">
                    {t(`singleProduct.howToUse.${step}`)}
                  </p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>

          <FadeInWhenVisible delay={0.6}>
            <div className="mt-12 bg-primary/10 border-2 border-primary/30 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {t('singleProduct.howToUse.proTip')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('singleProduct.howToUse.proTipText')}
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
