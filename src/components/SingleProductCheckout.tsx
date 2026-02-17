import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, MapPin, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { mainProduct } from '@/lib/singleProduct';
import { toast } from 'sonner';
import { FadeInWhenVisible } from './animations/FadeInWhenVisible';

export default function SingleProductCheckout() {
  const { t } = useLanguage();
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

      const response = await fetch(
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
    <section id="checkout" className="py-24 bg-gradient-subtle relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              {t('singleProduct.checkout.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('singleProduct.checkout.subtitle')}
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <FadeInWhenVisible direction="left">
              <Card className="p-8 bg-white shadow-card border-border">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                  {t('singleProduct.checkout.orderSummary')}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-border">
                    <div className="w-20 h-20 bg-gradient-subtle rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{mainProduct.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('singleProduct.showcase.subtitle')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t('singleProduct.checkout.product')}</span>
                      <span>{mainProduct.price} MAD</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{t('singleProduct.trustBadges.freeShipping')}</span>
                      <span className="text-green-600">{t('common.free')}</span>
                    </div>
                    <div className="pt-3 border-t border-border flex justify-between text-xl font-bold text-foreground">
                      <span>{t('singleProduct.checkout.totalPrice')}</span>
                      <span className="text-primary">{mainProduct.price} MAD</span>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                    <p className="text-sm text-foreground font-medium">
                      {t('singleProduct.checkout.paymentMethod')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('singleProduct.checkout.cod')}
                    </p>
                  </div>
                </div>
              </Card>
            </FadeInWhenVisible>

            {/* Checkout Form */}
            <FadeInWhenVisible direction="right">
              <Card className="p-8 bg-white shadow-card border-border">
                {/* Error Message */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      ref={errorRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
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
                      className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl text-center"
                    >
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-green-900 mb-2">
                        {t('singleProduct.checkout.success.title')}
                      </p>
                      <p className="text-sm text-green-700">
                        {t('singleProduct.checkout.success.message')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-foreground font-medium mb-2 block">
                      {t('singleProduct.checkout.name')} *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t('singleProduct.checkout.namePlaceholder')}
                        className={`pl-12 h-12 transition-all ${
                          focusedField === 'name' ? 'ring-2 ring-primary' : ''
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-foreground font-medium mb-2 block">
                      {t('singleProduct.checkout.phone')} *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t('singleProduct.checkout.phonePlaceholder')}
                        className={`pl-12 h-12 transition-all ${
                          focusedField === 'phone' ? 'ring-2 ring-primary' : ''
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address" className="text-foreground font-medium mb-2 block">
                      {t('singleProduct.checkout.address')} *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        onFocus={() => setFocusedField('address')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t('singleProduct.checkout.addressPlaceholder')}
                        className={`pl-12 min-h-[100px] transition-all ${
                          focusedField === 'address' ? 'ring-2 ring-primary' : ''
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className="w-full h-14 bg-gradient-rose text-white font-semibold text-lg rounded-xl hover:shadow-glow-intense transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        {t('singleProduct.checkout.processing')}
                      </>
                    ) : (
                      t('singleProduct.checkout.placeOrder')
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    {t('singleProduct.secureCheckout')}
                  </p>
                </form>
              </Card>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}
