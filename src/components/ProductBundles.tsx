import { motion } from "framer-motion";
import { Gift, Star, ShoppingBag, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { bundles as bundleData } from "@/lib/bundleTypes";
import siteConfig from "@/config/siteConfig";

const ProductBundles = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-soft-pink/20 blur-3xl pointer-events-none"
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
              {t('bundles.subtitle')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              {t('bundles.title')}
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              {t('bundles.description')}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="bundles">
          {bundleData.map((bundle, index) => (
            <FadeInWhenVisible key={bundle.id} delay={index * 0.1}>
              <motion.div
                className="relative bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group"
                whileHover={{ y: -8 }}
              >
                {/* Badge */}
                <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r ${bundle.gradient} text-white text-xs font-body tracking-wider uppercase shadow-lg`}>
                  {bundle.badge}
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-body font-bold shadow-lg">
                  <Star className="w-3 h-3 fill-white" />
                  {t('bundles.save')} {bundle.discount}%
                </div>

                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-subtle">
                  <img
                    src={bundle.images[0]}
                    alt={bundle.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Gift Icon */}
                  <motion.div
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Gift className="w-6 h-6 text-primary" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-foreground mb-2">
                    {bundle.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {bundle.description}
                  </p>

                  {/* Products Included */}
                  <div className="space-y-2 mb-6">
                    {bundle.products.map((product, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{product}</span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border my-4"></div>

                  {/* Pricing */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground line-through mb-1">
                        {bundle.originalPrice} MAD
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-3xl text-foreground">
                          {bundle.bundlePrice}
                        </span>
                        <span className="text-sm text-muted-foreground">MAD</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">
                        {t('bundles.youSave')}
                      </p>
                      <p className="font-heading text-lg text-green-600">
                        {bundle.originalPrice - bundle.bundlePrice} MAD
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    <Link to={`/bundle/${bundle.slug}`} className="block">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          className="w-full bg-gradient-rose text-white shadow-glow gap-2"
                          size="lg"
                        >
                          <Eye className="w-5 h-5" />
                          {t('bundles.viewDetails')}
                        </Button>
                      </motion.div>
                    </Link>
                  </div>

                  {/* Free Shipping Note */}
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    {t('bundles.freeShipping')}
                  </p>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeInWhenVisible delay={0.3}>
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">
              {t('bundles.customBundle')}
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="gap-2">
                {t('bundles.contactUs')}
              </Button>
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default ProductBundles;
