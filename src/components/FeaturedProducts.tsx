import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useProductData } from "@/hooks/useProductData";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductCategory } from "@/lib/productTypes";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { products, loading, error, featured } = useProductData();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { t } = useLanguage();

  // Get products based on selected category
  const getFilteredProducts = () => {
    if (selectedCategory === "all") {
      return products.slice(0, 8); // Show first 8 products
    }
    return products.filter((p) => p.category === selectedCategory).slice(0, 8);
  };

  const filteredProducts = getFilteredProducts();

  // Get unique categories from products
  const categories: ProductCategory[] = Array.from(
    new Set(products.map((p) => p.category))
  ).sort() as ProductCategory[];

  if (loading) {
    return (
      <section id="shop" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              {t('common.loading')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              {t('featured.title')}
            </h2>
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="shop" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-destructive">{t('featured.noProducts')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              {t('featured.subtitle')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              {t('featured.title')}
            </h2>
            <p className="font-body text-muted-foreground max-w-md mx-auto">
              {t('featured.description')}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Category Filter Tabs */}
        <FadeInWhenVisible delay={0.2}>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
            <TabsList className="w-full justify-center flex-wrap h-auto gap-2 bg-transparent">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-rose data-[state=active]:text-white data-[state=active]:shadow-glow"
              >
                {t('categories.viewAll')}
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-gradient-rose data-[state=active]:text-white data-[state=active]:shadow-glow"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-12">
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t('featured.noProducts')}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </FadeInWhenVisible>

        {/* View All Link */}
        <FadeInWhenVisible delay={0.4}>
          <div className="text-center mt-16">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-body text-sm tracking-wider uppercase text-foreground hover:text-primary transition-colors group"
            >
              {t('categories.viewAll')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default FeaturedProducts;
