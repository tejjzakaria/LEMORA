import { Link } from "react-router-dom";
import siteConfig from "@/config/siteConfig";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { siteName } = siteConfig;
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link to="/" className="inline-block mb-6">
            <img
              src="/logo.avif"
              alt={siteName}
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </Link>

          {/* Description */}
          <p className="font-body text-background/70 max-w-2xl leading-relaxed">
            {t('footer.description')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
