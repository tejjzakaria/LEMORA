import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProductData } from "@/hooks/useProductData";
import { ProductGrid } from "@/components/product/ProductGrid";
import ProductReviews from "@/components/ProductReviews";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteConfig from "@/config/siteConfig";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Sparkles,
  Leaf,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  CheckCircle2,
  ArrowLeft,
  User,
  Phone,
  MapPin,
  ShoppingBag,
  AlertCircle,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProductData();
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);

  const product = products.find((p) => p.id === id);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Scroll to error when it appears
  useEffect(() => {
    if (submitError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [submitError]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">{t('productDetail.loading')}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="font-heading text-4xl mb-4">{t('productDetail.notFoundTitle')}</h1>
          <p className="text-muted-foreground mb-8">
            {t('productDetail.notFoundDescription')}
          </p>
          <Button onClick={() => navigate("/shop")}>{t('productDetail.backToShop')}</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous states
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!formData.name || !formData.phone || !formData.address) {
      setSubmitError(t('productDetail.validation.requiredFields'));
      return;
    }

    setIsSubmitting(true);

    try {
      // Send order to Google Sheets
      const orderData = {
        productName: product.name,
        price: `${product.price} MAD`,
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyCZ4G67pT-kFmd-Z8njsInHAu_vYdrbHaL2VU1EcWlnR4lgdkV7L_3AGzUxy1uLSARxQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      // Since we're using no-cors, we won't get a readable response
      // but we can assume success if no error was thrown
      setSubmitSuccess(true);
      toast.success(t('productDetail.success.toast'), {
        duration: 5000,
      });

      // Reset form after short delay
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          address: "",
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting order:", error);
      setSubmitError(t('productDetail.error.message'));
      toast.error("Failed to submit order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Leaf, text: t('productDetail.benefits.naturalIngredients') },
    { icon: ShieldCheck, text: t('productDetail.benefits.dermatologicallyTested') },
    { icon: Heart, text: t('productDetail.benefits.crueltyFree') },
    { icon: Sparkles, text: t('productDetail.benefits.premiumQuality') },
  ];

  const features = [
    { icon: Truck, title: t('productDetail.features.freeShipping'), desc: t('productDetail.features.freeShippingDesc') },
    { icon: RefreshCw, title: t('productDetail.features.easyReturns'), desc: t('productDetail.features.easyReturnsDesc') },
    { icon: ShieldCheck, title: t('productDetail.features.secureCheckout'), desc: t('productDetail.features.secureCheckoutDesc') },
  ];

  // Translated content
  const productDescription = t('productDetail.descriptionTemplate', { productName: product.name });

  const keyBenefits = [
    t('productDetail.keyBenefitsList.0'),
    t('productDetail.keyBenefitsList.1'),
    t('productDetail.keyBenefitsList.2'),
    t('productDetail.keyBenefitsList.3'),
    t('productDetail.keyBenefitsList.4'),
    t('productDetail.keyBenefitsList.5'),
  ];

  const ingredients = [
    t('productDetail.ingredientsList.0'),
    t('productDetail.ingredientsList.1'),
    t('productDetail.ingredientsList.2'),
    t('productDetail.ingredientsList.3'),
    t('productDetail.ingredientsList.4'),
  ];

  const howToUse = [
    t('productDetail.howToUseList.0'),
    t('productDetail.howToUseList.1'),
    t('productDetail.howToUseList.2'),
    t('productDetail.howToUseList.3'),
    t('productDetail.howToUseList.4'),
    t('productDetail.howToUseList.5'),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-32 pb-8">
        <div className="container mx-auto px-6">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('productDetail.backToShop')}
          </button>
        </div>
      </div>

      {/* Product Hero Section */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <FadeInWhenVisible direction="left">
              <div className="space-y-4">
                <motion.div
                  className="aspect-square overflow-hidden rounded-sm shadow-card bg-gradient-subtle"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4 text-center border-0 shadow-sm">
                        <feature.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="text-xs font-semibold">{feature.title}</p>
                        <p className="text-xs text-muted-foreground">{feature.desc}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Product Info & Checkout */}
            <FadeInWhenVisible direction="right">
              <div className="space-y-6">
                {/* Category Badge */}
                <div className="inline-block">
                  <span className="px-3 py-1 bg-gradient-rose text-white text-xs font-semibold rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="font-heading text-4xl md:text-5xl mb-4">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">(4.9/5)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-4xl text-primary">
                    {product.price} MAD
                  </span>
                  {product.discountPrice && (
                    <span className="text-2xl text-muted-foreground line-through">
                      {product.discountPrice} MAD
                    </span>
                  )}
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3">
                  {benefits.map((benefit) => (
                    <div key={benefit.text} className="flex items-center gap-2">
                      <benefit.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* Checkout Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="relative overflow-hidden border-0 shadow-glow">
                    {/* Animated Background Gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-soft-pink/10 to-champagne/10 opacity-50"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <div className="relative p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <motion.div
                          className="w-12 h-12 rounded-full bg-gradient-rose flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <ShoppingBag className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="font-heading text-2xl">{t('productDetail.orderForm.title')}</h3>
                          <p className="text-sm text-muted-foreground">{t('productDetail.orderForm.subtitle')}</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-primary" />
                            {t('productDetail.orderForm.fullName')} *
                          </Label>
                          <div className="relative">
                            <Input
                              id="name"
                              placeholder={t('productDetail.orderForm.fullNamePlaceholder')}
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="pl-10 transition-all duration-300"
                              style={{
                                boxShadow:
                                  focusedField === "name"
                                    ? "0 0 0 3px hsl(var(--primary) / 0.1)"
                                    : "none",
                              }}
                            />
                            <User
                              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                                focusedField === "name"
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <AnimatePresence>
                              {focusedField === "name" && (
                                <motion.div
                                  className="absolute inset-0 rounded-md pointer-events-none"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  style={{
                                    boxShadow: "0 0 20px hsl(var(--primary) / 0.2)",
                                  }}
                                />
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>

                        {/* Phone Field */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                            <Phone className="w-4 h-4 text-primary" />
                            {t('productDetail.orderForm.phoneNumber')} *
                          </Label>
                          <div className="relative">
                            <Input
                              id="phone"
                              type="tel"
                              placeholder={t('productDetail.orderForm.phonePlaceholder')}
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              onFocus={() => setFocusedField("phone")}
                              onBlur={() => setFocusedField(null)}
                              required
                              className="pl-10 transition-all duration-300"
                              style={{
                                boxShadow:
                                  focusedField === "phone"
                                    ? "0 0 0 3px hsl(var(--primary) / 0.1)"
                                    : "none",
                              }}
                            />
                            <Phone
                              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                                focusedField === "phone"
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <AnimatePresence>
                              {focusedField === "phone" && (
                                <motion.div
                                  className="absolute inset-0 rounded-md pointer-events-none"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  style={{
                                    boxShadow: "0 0 20px hsl(var(--primary) / 0.2)",
                                  }}
                                />
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>

                        {/* Address Field */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            {t('productDetail.orderForm.fullAddress')} *
                          </Label>
                          <div className="relative">
                            <Textarea
                              id="address"
                              placeholder={t('productDetail.orderForm.addressPlaceholder')}
                              value={formData.address}
                              onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                              }
                              onFocus={() => setFocusedField("address")}
                              onBlur={() => setFocusedField(null)}
                              required
                              rows={4}
                              className="pl-10 pt-3 transition-all duration-300"
                              style={{
                                boxShadow:
                                  focusedField === "address"
                                    ? "0 0 0 3px hsl(var(--primary) / 0.1)"
                                    : "none",
                              }}
                            />
                            <MapPin
                              className={`absolute left-3 top-3 w-4 h-4 transition-colors duration-300 ${
                                focusedField === "address"
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <AnimatePresence>
                              {focusedField === "address" && (
                                <motion.div
                                  className="absolute inset-0 rounded-md pointer-events-none"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  style={{
                                    boxShadow: "0 0 20px hsl(var(--primary) / 0.2)",
                                  }}
                                />
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>

                        {/* Error Message */}
                        <AnimatePresence>
                          {submitError && (
                            <motion.div
                              ref={errorRef}
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                              className="relative"
                            >
                              <div className="p-4 bg-destructive/10 border-2 border-destructive rounded-lg">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0">
                                    <motion.div
                                      animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 5, -5, 0]
                                      }}
                                      transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatDelay: 2
                                      }}
                                    >
                                      <XCircle className="w-6 h-6 text-destructive" />
                                    </motion.div>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-destructive mb-1">
                                      {t('productDetail.error.title')}
                                    </h4>
                                    <p className="text-sm text-destructive/90 mb-2">
                                      {submitError}
                                    </p>
                                    <p className="text-xs text-destructive/70">
                                      {t('productDetail.error.needHelp')} <a href={`tel:${siteConfig.contact.phone}`} className="underline font-medium">{siteConfig.contact.phone}</a>
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => setSubmitError(null)}
                                    className="flex-shrink-0 text-destructive/60 hover:text-destructive transition-colors"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                </div>

                                {/* Retry Button */}
                                <motion.div
                                  className="mt-3"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSubmitError(null);
                                      handleSubmit(new Event('submit') as any);
                                    }}
                                    className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
                                  >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    {t('productDetail.error.tryAgain')}
                                  </Button>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Success Message */}
                        <AnimatePresence>
                          {submitSuccess && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                                <div className="flex items-start gap-3">
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 200,
                                      damping: 10
                                    }}
                                  >
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                  </motion.div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-green-800 mb-1">
                                      {t('productDetail.success.title')}
                                    </h4>
                                    <p className="text-sm text-green-700">
                                      {t('productDetail.success.message')}
                                    </p>
                                  </div>
                                </div>

                                {/* Success Animation */}
                                <motion.div
                                  className="mt-3 flex items-center justify-center gap-2 text-green-600"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                    }}
                                  >
                                    ✨
                                  </motion.div>
                                  <span className="text-sm font-medium">
                                    {t('productDetail.success.processing')}
                                  </span>
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      delay: 0.5
                                    }}
                                  >
                                    ✨
                                  </motion.div>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Total & Submit */}
                        <motion.div
                          className="pt-6 border-t border-border space-y-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <div className="flex justify-between items-center p-4 bg-gradient-subtle rounded-md">
                            <span className="font-semibold text-lg">{t('productDetail.orderForm.totalPrice')}</span>
                            <motion.span
                              className="font-heading text-3xl text-primary"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1, type: "spring", stiffness: 200 }}
                            >
                              {product.price} MAD
                            </motion.span>
                          </div>

                          <motion.div whileHover={{ scale: submitSuccess ? 1 : 1.02 }} whileTap={{ scale: submitSuccess ? 1 : 0.98 }}>
                            <Button
                              type="submit"
                              size="lg"
                              disabled={isSubmitting || submitSuccess}
                              className="w-full bg-gradient-rose hover:shadow-glow text-white font-semibold text-base py-6 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <AnimatePresence mode="wait">
                                {isSubmitting ? (
                                  <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                  >
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                      }}
                                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                    {t('productDetail.orderForm.processing')}
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="submit"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                  >
                                    <ShoppingBag className="w-5 h-5" />
                                    {t('productDetail.orderForm.orderNow')}
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Shimmer Effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                }}
                              />
                            </Button>
                          </motion.div>

                          <motion.p
                            className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1 }}
                          >
                            <ShieldCheck className="w-3 h-3" />
                            {t('productDetail.orderForm.secureCheckoutNote')}
                          </motion.p>
                        </motion.div>
                      </form>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl mb-6">
                {t('productDetail.sections.description')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {productDescription}
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl mb-8">{t('productDetail.sections.keyBenefits')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Ingredients & How to Use */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeInWhenVisible direction="left">
              <Card className="p-8 border-0 shadow-card h-full">
                <h3 className="font-heading text-2xl mb-6 flex items-center gap-3">
                  <Leaf className="w-6 h-6 text-primary" />
                  {t('productDetail.sections.ingredients')}
                </h3>
                <ul className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="right">
              <Card className="p-8 border-0 shadow-card h-full">
                <h3 className="font-heading text-2xl mb-6 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  {t('productDetail.sections.howToUse')}
                </h3>
                <ol className="space-y-3">
                  {howToUse.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-gradient-rose text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Product Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ProductReviews productId={product.id} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-6">
            <FadeInWhenVisible>
              <h2 className="font-heading text-3xl md:text-4xl mb-12 text-center">
                {t('productDetail.sections.relatedProducts')}
              </h2>
              <ProductGrid products={relatedProducts} />
            </FadeInWhenVisible>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
