import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import siteConfig from "@/config/siteConfig";
import CTASection from "@/components/CTASection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { contact, businessHours } = siteConfig;
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: Mail,
      title: t('contactPage.emailTitle'),
      value: contact.email,
      href: `mailto:${contact.email}`,
      description: t('contactPage.emailDescription'),
    },
    {
      icon: Phone,
      title: t('contactPage.callTitle'),
      value: contact.phone,
      href: `tel:${contact.phone}`,
      description: t('contactPage.callDescription'),
    },
    {
      icon: WhatsAppIcon,
      title: t('contactPage.whatsappTitle'),
      value: contact.phone,
      href: `https://wa.me/${contact.whatsapp}`,
      description: t('contactPage.whatsappDescription'),
    },
    {
      icon: MapPin,
      title: t('contactPage.visitTitle'),
      value: `${contact.address.city}, ${contact.address.country}`,
      href: `https://maps.google.com/?q=${contact.address.street}, ${contact.address.city}`,
      description: contact.address.street,
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: contact.social.facebook },
    { name: "Instagram", icon: Instagram, href: contact.social.instagram },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-hero-bold bg-gradient-animated animate-gradient-shift relative overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-soft-pink/30 blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-6">
                {t('contactPage.heroSubtitle')}
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {t('contactPage.heroTitle')}
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('contactPage.heroDescription')}
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <FadeInWhenVisible key={method.title} delay={index * 0.1}>
                <motion.a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 h-full border-0 shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-rose flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-heading text-lg mb-2 group-hover:text-primary transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                      <p className="font-body text-foreground font-semibold">{method.value}</p>
                    </div>
                  </Card>
                </motion.a>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* Business Hours & Social */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Business Hours */}
            <FadeInWhenVisible delay={0.4}>
              <Card className="p-8 border-0 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-rose flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-heading text-2xl">{t('contactPage.businessHoursTitle')}</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">{t('contactPage.weekdays')}</span>
                    <span className="font-semibold">{businessHours.weekdays.split(': ')[1]}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">{t('contactPage.saturday')}</span>
                    <span className="font-semibold">{businessHours.saturday.split(': ')[1]}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">{t('contactPage.sunday')}</span>
                    <span className="font-semibold">{businessHours.sunday.split(': ')[1]}</span>
                  </div>
                </div>
              </Card>
            </FadeInWhenVisible>

            {/* Social Media */}
            <FadeInWhenVisible delay={0.5}>
              <Card className="p-8 border-0 shadow-card">
                <h2 className="font-heading text-2xl mb-6">{t('contactPage.followUsTitle')}</h2>
                <p className="text-muted-foreground mb-6">
                  {t('contactPage.followUsDescription')}
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 hover:bg-gradient-rose hover:text-white hover:border-transparent"
                      >
                        <social.icon className="w-5 h-5" />
                        {social.name}
                      </Button>
                    </motion.a>
                  ))}
                </div>
              </Card>
            </FadeInWhenVisible>
          </div>

          {/* Map or Additional Info */}
          <FadeInWhenVisible delay={0.6}>
            <div className="mt-16 text-center">
              <Card className="p-12 border-0 shadow-card bg-gradient-subtle">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-heading text-2xl mb-2">{t('contactPage.locationTitle')}</h3>
                <p className="text-lg text-muted-foreground mb-2">{contact.address.street}</p>
                <p className="text-lg text-muted-foreground mb-4">
                  {contact.address.city}, {contact.address.postalCode}
                </p>
                <p className="text-lg font-semibold text-foreground">{contact.address.country}</p>
              </Card>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default Contact;
