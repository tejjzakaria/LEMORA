import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, ShoppingBag, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const quickLinks = [
    {
      icon: Home,
      label: t('notFound.goHome'),
      onClick: () => navigate("/"),
      variant: "default" as const,
    },
    {
      icon: ShoppingBag,
      label: t('notFound.shopNow'),
      onClick: () => navigate("/shop"),
      variant: "outline" as const,
    },
    {
      icon: Search,
      label: t('notFound.exploreProducts'),
      onClick: () => navigate("/shop"),
      variant: "outline" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 404 Content */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-soft-pink/20 blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-rose-gold/20 blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <motion.h1
                  className="font-heading text-[180px] md:text-[240px] lg:text-[300px] leading-none bg-gradient-rose bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  404
                </motion.h1>

                {/* Floating Sparkles */}
                <motion.div
                  className="absolute top-10 right-10"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-12 h-12 text-primary" />
                </motion.div>
                <motion.div
                  className="absolute bottom-10 left-10"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, -180, -360],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <Sparkles className="w-8 h-8 text-primary opacity-60" />
                </motion.div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
                {t('notFound.title')}
              </h2>
              <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('notFound.description')}
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center mb-16"
            >
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={link.variant}
                    size="lg"
                    onClick={link.onClick}
                    className={`gap-2 ${
                      link.variant === "default"
                        ? "bg-gradient-rose text-white shadow-glow"
                        : ""
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Go Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="font-body text-sm tracking-wide uppercase">
                  {t('notFound.goBack')}
                </span>
              </button>
            </motion.div>

            {/* Decorative Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-20"
            >
              <Card className="p-8 md:p-12 border-0 shadow-card bg-gradient-subtle">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-left">
                    <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                      {t('notFound.helpTitle')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('notFound.helpDescription')}
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      onClick={() => navigate("/contact")}
                      className="bg-gradient-rose text-white shadow-glow whitespace-nowrap"
                    >
                      {t('notFound.contactUs')}
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFound;
