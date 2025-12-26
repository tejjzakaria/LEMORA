import { useMemo } from "react";
import { motion } from "framer-motion";
import { useProductData } from "@/hooks/useProductData";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Categories = () => {
  const { products } = useProductData();
  const { t } = useLanguage();

  // Get dynamic categories from CSV data
  const categories = useMemo(() => {
    const categoryMap = new Map();

    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, {
          name: product.category,
          count: 1,
          image: product.imageUrl,
        });
      } else {
        const existing = categoryMap.get(product.category);
        categoryMap.set(product.category, {
          ...existing,
          count: existing.count + 1,
        });
      }
    });

    return Array.from(categoryMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [products]);

  return (
    <section id="categories" className="py-24 md:py-32 bg-gradient-subtle relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 rounded-full bg-rose-gold/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              {t('categories.subtitle')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground">
              {t('categories.title')}
            </h2>
            <p className="font-body text-muted-foreground max-w-md mx-auto mt-4">
              {t('categories.description')}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <FadeInWhenVisible key={category.name} delay={index * 0.15}>
              <motion.a
                href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative aspect-[3/4] block overflow-hidden rounded-sm shadow-card will-change-transform"
                style={{ perspective: "1000px" }}
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: -5,
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Background Image */}
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />

                {/* Animated Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <motion.div
                    initial={{ y: 0 }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-body text-xs tracking-[0.3em] uppercase text-white/70 mb-2 block">
                      {t('categories.productsCount', { count: category.count })}
                    </span>
                    <h3 className="font-heading text-3xl md:text-4xl text-white mb-4">
                      {category.name}
                    </h3>
                  </motion.div>

                  {/* Explore Button */}
                  <motion.div
                    className="inline-flex items-center gap-2 text-white font-body text-sm tracking-wider uppercase"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t('categories.subtitle')}
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary/0 rounded-sm pointer-events-none"
                  whileHover={{
                    borderColor: "hsl(var(--primary) / 0.5)",
                    boxShadow: "0 0 30px hsl(var(--primary) / 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
