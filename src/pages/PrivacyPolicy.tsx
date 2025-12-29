import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { Shield, Lock, Eye, UserCheck, Mail, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: UserCheck,
      title: t('privacy.sections.collection.title'),
      content: t('privacy.sections.collection.content'),
    },
    {
      icon: Lock,
      title: t('privacy.sections.usage.title'),
      content: t('privacy.sections.usage.content'),
    },
    {
      icon: Shield,
      title: t('privacy.sections.protection.title'),
      content: t('privacy.sections.protection.content'),
    },
    {
      icon: Eye,
      title: t('privacy.sections.disclosure.title'),
      content: t('privacy.sections.disclosure.content'),
    },
    {
      icon: Globe,
      title: t('privacy.sections.cookies.title'),
      content: t('privacy.sections.cookies.content'),
    },
    {
      icon: Mail,
      title: t('privacy.sections.rights.title'),
      content: t('privacy.sections.rights.content'),
    },
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-rose mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
                {t('privacy.title')}
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('privacy.subtitle')}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {t('privacy.lastUpdated')}
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <FadeInWhenVisible>
              <Card className="p-8 mb-12 border-0 shadow-card bg-gradient-subtle">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('privacy.introduction')}
                </p>
              </Card>
            </FadeInWhenVisible>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <FadeInWhenVisible key={section.title} delay={index * 0.1}>
                  <Card className="p-8 border-0 shadow-card hover:shadow-hover transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-rose flex items-center justify-center flex-shrink-0">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
                          {section.title}
                        </h2>
                        <div className="prose prose-lg max-w-none">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeInWhenVisible>
              ))}
            </div>

            {/* Contact Section */}
            <FadeInWhenVisible delay={0.6}>
              <Card className="p-8 mt-12 border-0 shadow-card bg-gradient-hero">
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  {t('privacy.contact.title')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('privacy.contact.description')}
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
                >
                  <Mail className="w-5 h-5" />
                  {t('privacy.contact.link')}
                </a>
              </Card>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
