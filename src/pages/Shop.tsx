import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useProductData } from "@/hooks/useProductData";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductCategory } from "@/lib/productTypes";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Shop = () => {
  const { products, loading, error } = useProductData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { t } = useLanguage();

  // Read category from URL on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Get products based on selected category
  const getFilteredProducts = () => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  };

  const filteredProducts = getFilteredProducts();

  // Get unique categories from products
  const categories: ProductCategory[] = Array.from(
    new Set(products.map((p) => p.category))
  ).sort() as ProductCategory[];

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              {t('common.loading')}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl text-foreground mb-4">
              {t('shop.loadingTitle')}
            </h1>
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-foreground mb-4">{t('shop.errorTitle')}</h1>
          <p className="text-destructive">{t('shop.errorMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-hero-bold bg-gradient-animated animate-gradient-shift relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 rounded-full bg-rose-gold/20 blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-6">
                {t('shop.subtitle')}
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {t('shop.title')}
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('shop.description')}
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Category Filter Tabs */}
          <FadeInWhenVisible delay={0.2}>
            <Tabs
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                if (value === "all") {
                  setSearchParams({});
                } else {
                  setSearchParams({ category: value });
                }
              }}
              className="mb-16"
            >
              <TabsList className="w-full justify-center flex-wrap h-auto gap-2 bg-transparent">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gradient-rose data-[state=active]:text-white data-[state=active]:shadow-glow"
                >
                  {t('shop.allProducts')} ({products.length})
                </TabsTrigger>
                {categories.map((category) => {
                  const count = products.filter((p) => p.category === category).length;
                  return (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="data-[state=active]:bg-gradient-rose data-[state=active]:text-white data-[state=active]:shadow-glow"
                    >
                      {category} ({count})
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-12">
                {filteredProducts.length > 0 ? (
                  <ProductGrid products={filteredProducts} />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      {t('shop.noProducts')}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </FadeInWhenVisible>

          {/* Product Count */}
          <FadeInWhenVisible delay={0.4}>
            <div className="text-center mt-16 pt-8 border-t border-border">
              <p className="text-muted-foreground">
                {t('shop.showing')} <span className="text-foreground font-semibold">{filteredProducts.length}</span> {t('shop.of')}{" "}
                <span className="text-foreground font-semibold">{products.length}</span> {t('shop.products')}
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
