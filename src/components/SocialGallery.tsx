import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";
import siteConfig from "@/config/siteConfig";

const SocialGallery = () => {
  const { t } = useLanguage();

  const galleryImages = [
    {
      url: "https://floriyacosmetics.com/cdn/shop/files/MOCKUP4.png?v=1745189016&width=533",
      alt: "Floriya Product 1",
    },
    {
      url: "/hero.webp",
      alt: "Floriya Hero",
    },
    {
      url: "https://floriyacosmetics.com/cdn/shop/files/IMG_9845_1.jpg?v=1713770822&width=533",
      alt: "Floriya Product 2",
    },
    {
      url: "https://floriyacosmetics.com/cdn/shop/files/MOCKUP3.png?v=1745189088&width=533",
      alt: "Floriya Product 3",
    },
    {
      url: "https://floriyacosmetics.com/cdn/shop/files/MOCKUP2.png?v=1745189126&width=533",
      alt: "Floriya Product 4",
    },
    {
      url: "https://floriyacosmetics.com/cdn/shop/files/MOCKUP1.png?v=1745189149&width=533",
      alt: "Floriya Product 5",
    },
    {
      url: "https://floriyacosmetics.com/cdn/shop/files/IMG_9843.jpg?v=1713770820&width=533",
      alt: "Floriya Product 6",
    },
    {
      url: "https://floriyacosmetics.com/cdn/shop/files/IMG_9847.jpg?v=1713770820&width=533",
      alt: "Floriya Product 7",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-champagne/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              {t('socialGallery.subtitle')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              {t('socialGallery.title')}
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('socialGallery.description')}
            </p>

            {/* Instagram Button */}
            <a
              href={siteConfig.contact.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-lg shadow-lg font-body text-sm tracking-wider uppercase"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
                {t('socialGallery.followButton')}
              </motion.button>
            </a>
          </div>
        </FadeInWhenVisible>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.05}>
              <motion.a
                href={siteConfig.contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-lg shadow-card cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-pink-500/80 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Instagram className="w-8 h-8 text-white" />
                </motion.div>
              </motion.a>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialGallery;
