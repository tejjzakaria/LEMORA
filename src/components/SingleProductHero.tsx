import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, User, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mainProduct } from '@/lib/singleProduct';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export default function SingleProductHero() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [submitError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitError(null);
    setSubmitSuccess(false);

    if (!formData.name || !formData.phone || !formData.address) {
      setSubmitError(t('singleProduct.checkout.validation.required'));
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        productName: mainProduct.name,
        price: `${mainProduct.price} MAD`,
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
      };

      await fetch(
        'https://script.google.com/macros/s/AKfycbyCZ4G67pT-kFmd-Z8njsInHAu_vYdrbHaL2VU1EcWlnR4lgdkV7L_3AGzUxy1uLSARxQ/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      );

      setSubmitSuccess(true);
      toast.success(t('singleProduct.checkout.success.toast'), {
        duration: 5000,
      });

      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          address: '',
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitError(t('singleProduct.checkout.error.message'));
      toast.error(t('singleProduct.checkout.error.title'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="checkout" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero pt-24 md:pt-32 pb-12 md:pb-0">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-accent/20 rounded-full blur-3xl animate-float-slow animation-delay-300" />

      <div className="container mx-auto px-4 py-8 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center">
          {/* Left side - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-rose opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500" />

              {/* Main product image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden shadow-glow-intense bg-white/50 backdrop-blur-sm border border-white/60"
              >
                <img
                  src={mainProduct.images[selectedImage]}
                  alt={mainProduct.name}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>

            {/* Small product images carousel */}
            <div className="mt-4 md:mt-6 flex gap-2 md:gap-4 justify-center overflow-x-auto pb-2">
              {mainProduct.images.map((image, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden shadow-card transition-all cursor-pointer active:scale-95 md:hover:scale-105 ${
                    selectedImage === idx
                      ? 'ring-3 md:ring-4 ring-primary border-2 border-primary'
                      : 'border-2 border-white/60 hover:border-primary/60'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right side - Product Details + Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              {t('singleProduct.badge')}
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                {mainProduct.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mt-2 md:mt-3 font-light italic">
                {t('singleProduct.tagline')}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {t('singleProduct.description')}
            </motion.p>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-baseline gap-3 md:gap-4"
            >
              <span className="text-4xl sm:text-5xl font-bold text-primary">
                {mainProduct.price} MAD
              </span>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="flex items-center gap-2 text-sm text-foreground">
                <div className="w-1.5 h-1.5 bg-gradient-rose rounded-full" />
                {t('singleProduct.features.natural')}
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <div className="w-1.5 h-1.5 bg-gradient-rose rounded-full" />
                {t('singleProduct.features.handcrafted')}
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <div className="w-1.5 h-1.5 bg-gradient-rose rounded-full" />
                {t('singleProduct.features.crueltyFree')}
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <div className="w-1.5 h-1.5 bg-gradient-rose rounded-full" />
                {t('singleProduct.features.sustainable')}
              </div>
            </motion.div>

            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-4 md:pt-6"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-glow border-2 border-primary/20">
                {/* Error Message */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      ref={errorRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3"
                    >
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-red-900">
                          {t('singleProduct.checkout.error.title')}
                        </p>
                        <p className="text-sm text-red-700 mt-1">{submitError}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success Message */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="mb-6 p-6 bg-green-50 border-2 border-green-200 rounded-2xl text-center"
                    >
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <p className="text-lg font-bold text-green-900 mb-2">
                        {t('singleProduct.checkout.success.title')}
                      </p>
                      <p className="text-sm text-green-700">
                        {t('singleProduct.checkout.success.message')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                      {t('singleProduct.checkout.title')}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      {t('singleProduct.checkout.subtitle')}
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-foreground font-semibold mb-1.5 md:mb-2 block text-sm md:text-base">
                      {t('singleProduct.checkout.name')} *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground pointer-events-none" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t('singleProduct.checkout.namePlaceholder')}
                        className={`pl-10 md:pl-12 h-12 md:h-14 text-sm md:text-base rounded-lg md:rounded-xl border-2 transition-all ${
                          focusedField === 'name' ? 'ring-2 md:ring-4 ring-primary/20 border-primary' : 'border-border'
                        }`}
                        required
                        disabled={isSubmitting || submitSuccess}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-foreground font-semibold mb-1.5 md:mb-2 block text-sm md:text-base">
                      {t('singleProduct.checkout.phone')} *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground pointer-events-none" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t('singleProduct.checkout.phonePlaceholder')}
                        className={`pl-10 md:pl-12 h-12 md:h-14 text-sm md:text-base rounded-lg md:rounded-xl border-2 transition-all ${
                          focusedField === 'phone' ? 'ring-2 md:ring-4 ring-primary/20 border-primary' : 'border-border'
                        }`}
                        required
                        disabled={isSubmitting || submitSuccess}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address" className="text-foreground font-semibold mb-1.5 md:mb-2 block text-sm md:text-base">
                      {t('singleProduct.checkout.address')} *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 md:left-4 top-3 md:top-4 w-4 md:w-5 h-4 md:h-5 text-muted-foreground pointer-events-none" />
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        onFocus={() => setFocusedField('address')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t('singleProduct.checkout.addressPlaceholder')}
                        className={`pl-10 md:pl-12 min-h-[90px] md:min-h-[100px] text-sm md:text-base rounded-lg md:rounded-xl border-2 resize-none transition-all ${
                          focusedField === 'address' ? 'ring-2 md:ring-4 ring-primary/20 border-primary' : 'border-border'
                        }`}
                        required
                        disabled={isSubmitting || submitSuccess}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className="w-full h-14 md:h-16 bg-gradient-rose text-white font-bold text-base md:text-lg rounded-lg md:rounded-xl hover:shadow-glow-intense transition-all duration-300 active:scale-95 md:hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 md:w-6 md:h-6 border-3 border-white border-t-transparent rounded-full mr-2 md:mr-3"
                        />
                        {t('singleProduct.checkout.processing')}
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                        {t('singleProduct.checkout.placeOrder')}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground pt-1 md:pt-2">
                    {t('singleProduct.secureCheckout')}
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 pt-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t('singleProduct.trustBadges.freeShipping')}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t('singleProduct.trustBadges.returns')}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t('singleProduct.trustBadges.secure')}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
