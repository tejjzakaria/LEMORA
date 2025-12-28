import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getBundleBySlug } from "@/lib/bundleTypes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteConfig from "@/config/siteConfig";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Gift,
  Star,
  ShoppingBag,
  Check,
  ArrowLeft,
  User,
  Phone,
  MapPin,
  XCircle,
  CheckCircle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Truck,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

const BundleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
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

  const bundle = slug ? getBundleBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (submitError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [submitError]);

  if (!bundle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="font-heading text-4xl mb-4">{t('bundleDetail.notFoundTitle')}</h1>
          <p className="text-muted-foreground mb-8">
            {t('bundleDetail.notFoundDescription')}
          </p>
          <Button onClick={() => navigate("/#bundles")}>{t('bundleDetail.backToBundles')}</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    if (!formData.name || !formData.phone || !formData.address) {
      setSubmitError(t('bundleDetail.validation.requiredFields'));
      setIsSubmitting(false);
      return;
    }

    try {
      const orderData = {
        productName: bundle.name,
        price: `${bundle.bundlePrice} MAD`,
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyCZ4G67pT-kFmd-Z8njsInHAu_vYdrbHaL2VU1EcWlnR4lgdkV7L_3AGzUxy1uLSARxQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      toast.success(t('bundleDetail.success.toast'));
      setSubmitSuccess(true);
      setFormData({ name: "", phone: "", address: "" });
    } catch (error) {
      setSubmitError(t('bundleDetail.error.message'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const savingsAmount = bundle.originalPrice - bundle.bundlePrice;
  const savingsPercentage = bundle.discount;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section className="pt-40 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground transition-colors">
              {t('common.home')}
            </Link>
            <span>/</span>
            <Link to="/#bundles" className="hover:text-foreground transition-colors">
              {t('bundleDetail.bundles')}
            </Link>
            <span>/</span>
            <span className="text-foreground">{bundle.name}</span>
          </div>
        </div>
      </section>

      {/* Bundle Detail */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <FadeInWhenVisible direction="left">
              <div className="space-y-4">
                {/* Badge */}
                <div className="flex gap-3 mb-4">
                  <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${bundle.gradient} text-white text-sm font-body tracking-wider uppercase shadow-lg`}>
                    {bundle.badge}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-body font-bold shadow-lg flex items-center gap-1">
                    <Star className="w-4 h-4 fill-white" />
                    {t('bundleDetail.save')} {savingsPercentage}%
                  </span>
                </div>

                {/* Main Image */}
                <motion.div
                  className="relative aspect-square rounded-lg overflow-hidden shadow-hover bg-gradient-subtle"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={bundle.images[selectedImage]}
                    alt={bundle.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Gift className="w-8 h-8 text-primary" />
                  </div>
                </motion.div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-3 gap-4">
                  {bundle.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden ${
                        selectedImage === index
                          ? 'ring-4 ring-primary shadow-glow'
                          : 'opacity-70 hover:opacity-100'
                      } transition-all duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image}
                        alt={`${bundle.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Details & Order Form */}
            <FadeInWhenVisible direction="right">
              <div className="space-y-6">
                {/* Title & Description */}
                <div>
                  <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                    {bundle.name}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {bundle.detailedDescription}
                  </p>
                </div>

                {/* Pricing */}
                <Card className="p-6 bg-gradient-subtle border-2 border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground line-through mb-1">
                        {t('bundleDetail.originalPrice')}: {bundle.originalPrice} MAD
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-5xl text-foreground">
                          {bundle.bundlePrice}
                        </span>
                        <span className="text-xl text-muted-foreground">MAD</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">
                        {t('bundleDetail.youSave')}
                      </p>
                      <p className="font-heading text-3xl text-green-600">
                        {savingsAmount} MAD
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Truck className="w-4 h-4" />
                    <span className="font-semibold">{t('bundleDetail.freeShipping')}</span>
                  </div>
                </Card>

                {/* Order Form */}
                <Card className="p-6 border-2 border-border">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-rose flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl text-foreground">
                          {t('bundleDetail.orderForm.title')}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {t('bundleDetail.orderForm.subtitle')}
                        </p>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-primary" />
                        {t('bundleDetail.orderForm.fullName')} *
                      </Label>
                      <Input
                        id="name"
                        placeholder={t('bundleDetail.orderForm.fullNamePlaceholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="transition-all duration-300"
                        style={{
                          boxShadow: focusedField === "name" ? "0 0 0 3px hsl(var(--primary) / 0.1)" : "none",
                        }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-primary" />
                        {t('bundleDetail.orderForm.phoneNumber')} *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t('bundleDetail.orderForm.phonePlaceholder')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="transition-all duration-300"
                        style={{
                          boxShadow: focusedField === "phone" ? "0 0 0 3px hsl(var(--primary) / 0.1)" : "none",
                        }}
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {t('bundleDetail.orderForm.fullAddress')} *
                      </Label>
                      <Textarea
                        id="address"
                        placeholder={t('bundleDetail.orderForm.addressPlaceholder')}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        onFocus={() => setFocusedField("address")}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={4}
                        className="transition-all duration-300"
                        style={{
                          boxShadow: focusedField === "address" ? "0 0 0 3px hsl(var(--primary) / 0.1)" : "none",
                        }}
                      />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {submitError && (
                        <motion.div
                          ref={errorRef}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 bg-destructive/10 border-2 border-destructive rounded-lg"
                        >
                          <div className="flex items-start gap-3">
                            <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-destructive">{submitError}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Success */}
                    <AnimatePresence>
                      {submitSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 bg-green-50 border-2 border-green-500 rounded-lg"
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-700">
                              {t('bundleDetail.success.message')}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || submitSuccess}
                      className="w-full bg-gradient-rose text-white shadow-glow gap-2"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div key="loading" className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            {t('bundleDetail.orderForm.processing')}
                          </motion.div>
                        ) : (
                          <motion.div key="submit" className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            {t('bundleDetail.orderForm.orderNow')}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>

                    <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
                      <ShieldCheck className="w-3 h-3" />
                      {t('bundleDetail.orderForm.secureCheckout')}
                    </p>
                  </form>
                </Card>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <h2 className="font-heading text-3xl md:text-4xl text-center mb-12">
              {t('bundleDetail.whatsIncluded')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {bundle.whatsIncluded.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 border-0 shadow-card hover:shadow-hover transition-all duration-300 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-rose flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg text-foreground mb-2">
                          {item.item}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl text-center mb-12">
                {t('bundleDetail.benefits')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bundle.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                {t('bundleDetail.cta.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('bundleDetail.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-rose text-white shadow-glow gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {t('bundleDetail.cta.orderNow')}
                </Button>
                <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2 w-full">
                    <Phone className="w-5 h-5" />
                    {t('bundleDetail.cta.askQuestion')}
                  </Button>
                </a>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BundleDetail;
