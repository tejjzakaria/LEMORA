import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import QuizCTA from "@/components/QuizCTA";
import ProductBundles from "@/components/ProductBundles";
import HowItWorks from "@/components/HowItWorks";
import IngredientsSpotlight from "@/components/IngredientsSpotlight";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import SocialGallery from "@/components/SocialGallery";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <FeaturedProducts />
        <Categories />
        <QuizCTA />
        <ProductBundles />
        <HowItWorks />
        <IngredientsSpotlight />
        <About />
        <Testimonials />
        <SocialGallery />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
