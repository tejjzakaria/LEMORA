import { motion } from 'framer-motion';
import { FadeInWhenVisible } from './animations/FadeInWhenVisible';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductShowcase() {
  const { t } = useLanguage();

  const products = [
    {
      key: 'roseBliss',
      benefits: ['deepHydration', 'antiAging', 'aromatherapy', 'evenTone'],
    },
    {
      key: 'calendulaSunrise',
      benefits: ['soothes', 'healing', 'calms', 'gentle'],
    },
    {
      key: 'butterflyPea',
      benefits: ['multiPurpose', 'antioxidants', 'elasticity', 'nourishes'],
    },
  ];

  const features = [
    'natural',
    'handcrafted',
    'noSynthetic',
    'crueltyFree',
    'sustainable',
    'smallBatch',
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-subtle relative overflow-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 md:mb-4 px-4">
              {t('singleProduct.showcase.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground px-4">
              {t('singleProduct.showcase.description')}
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.2}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-hover transition-all duration-500 border border-border group"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:text-gradient transition-all">
                    {t(`singleProduct.products.${product.key}.name`)}
                  </h3>
                  <p className="text-sm text-primary font-medium uppercase tracking-wide">
                    {t(`singleProduct.products.${product.key}.subtitle`)}
                  </p>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t(`singleProduct.products.${product.key}.description`)}
                </p>

                <div className="mb-6 inline-block bg-secondary/50 px-4 py-2 rounded-full text-sm font-medium text-foreground">
                  30ml / 1 fl oz
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    {t('productDetail.sections.ingredients')}
                  </h4>
                  <p className="text-sm text-muted-foreground italic">
                    {t(`singleProduct.products.${product.key}.ingredients`)}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    {t('singleProduct.benefits.title')}
                  </h4>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg
                          className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {t(`singleProduct.benefits.${benefit}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible delay={0.8}>
          <div className="mt-20 bg-white rounded-3xl p-12 shadow-card max-w-5xl mx-auto">
            <h3 className="text-3xl font-heading font-bold text-center text-foreground mb-12">
              {t('singleProduct.features.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-gradient-rose rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold text-foreground">{t(`singleProduct.features.${feature}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
