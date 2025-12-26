import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as const, label: 'EN', fullName: 'English' },
    { code: 'fr' as const, label: 'FR', fullName: 'Français' },
  ];

  return (
    <div className="relative flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`relative px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full transition-colors ${
              language === lang.code
                ? 'text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${lang.fullName}`}
          >
            {language === lang.code && (
              <motion.div
                layoutId="language-active-pill"
                className="absolute inset-0 bg-gradient-rose rounded-full -z-10"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{lang.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
