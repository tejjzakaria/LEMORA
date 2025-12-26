import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('header.home'), href: "/" },
    { name: t('header.shop'), href: "/shop" },
    { name: t('header.about'), href: "/about" },
    { name: t('header.contact'), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: isScrolled ? "hsl(var(--background) / 0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        boxShadow: isScrolled ? "var(--shadow-soft)" : "none",
        paddingTop: isScrolled ? "1rem" : "1.5rem",
        paddingBottom: isScrolled ? "1rem" : "1.5rem",
        transition: "all 500ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo with Animation */}
          <Link to="/">
            <motion.div
              className="flex items-center group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <motion.img
              src="/logo.avif"
              alt="Lemora Cosmetics"
              className="h-12 md:h-14 lg:h-16 w-auto object-contain"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              initial={{ opacity: 0 }}
              whileHover={{
                opacity: 1,
                boxShadow: "0 0 20px hsl(var(--primary) / 0.3)"
              }}
              transition={{ duration: 0.3 }}
            />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link key={link.name} to={link.href}>
                  <motion.div
                    className={`relative font-body text-sm tracking-widest uppercase transition-colors ${
                      isActive ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
                    }`}
                    whileHover="hover"
                  >
                    {link.name}
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-rose"
                      initial={{ scaleX: isActive ? 1 : 0 }}
                      variants={{ hover: { scaleX: 1 } }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher & CTA Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/shop">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-rose text-white text-sm tracking-wider uppercase rounded-sm shadow-glow font-body"
              >
                {t('header.shopNow')}
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="lg:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 glass shadow-hover"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <Link key={link.name} to={link.href}>
                  <motion.div
                    className="font-heading text-2xl text-foreground hover:text-primary transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <motion.div
                className="mt-6 flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <LanguageSwitcher />
              </motion.div>

              {/* Mobile CTA */}
              <Link to="/shop">
                <motion.div
                  className="mt-4 px-6 py-3 bg-gradient-rose text-white text-sm tracking-wider uppercase rounded-sm shadow-glow font-body text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1 }}
                >
                  {t('header.shopNow')}
                </motion.div>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
