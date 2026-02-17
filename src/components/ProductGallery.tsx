import { motion } from 'framer-motion';
import { useState } from 'react';
import { mainProduct } from '@/lib/singleProduct';
import { FadeInWhenVisible } from './animations/FadeInWhenVisible';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 md:mb-4 px-4">
              {t('singleProduct.gallery.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground px-4">
              {t('singleProduct.gallery.description')}
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden shadow-glow-intense mb-8 aspect-[16/10] bg-white/50 border border-white/60"
            >
              <img
                src={mainProduct.images[selectedImage]}
                alt={`Product gallery ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-5 gap-4">
            {mainProduct.images.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(index)}
                className={`relative rounded-2xl overflow-hidden aspect-square transition-all duration-300 ${
                  selectedImage === index
                    ? 'ring-4 ring-primary shadow-glow'
                    : 'ring-2 ring-border hover:ring-primary/50'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
