import Header from "@/components/Header";
import SingleProductHero from "@/components/SingleProductHero";
import TrustBadges from "@/components/TrustBadges";
import ProductShowcase from "@/components/ProductShowcase";
import ProductGallery from "@/components/ProductGallery";
import HowToUse from "@/components/HowToUse";
import IngredientsSpotlight from "@/components/IngredientsSpotlight";
import ProductTestimonials from "@/components/ProductTestimonials";
import SocialGallery from "@/components/SocialGallery";
import FAQ from "@/components/FAQ";
import SingleProductCTA from "@/components/SingleProductCTA";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SingleProductHero />
        <TrustBadges />
        <SingleProductCTA />
        <ProductShowcase />
        <SingleProductCTA />
        <ProductGallery />
        <SingleProductCTA />
        <HowToUse />
        <SingleProductCTA />
        <IngredientsSpotlight />
        <SingleProductCTA />
        <ProductTestimonials />
        <SingleProductCTA />
        <SocialGallery />
        <SingleProductCTA />
        <FAQ />
        <SingleProductCTA />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
