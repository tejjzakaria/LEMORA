import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import siteConfig from "@/config/siteConfig";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppWidget = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { t } = useLanguage();

  const handleClick = () => {
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-4 w-64"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 relative">
              {/* Close button */}
              <button
                onClick={() => setIsTooltipVisible(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Tooltip content */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold text-foreground text-sm mb-1">
                    {t('whatsappWidget.title')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t('whatsappWidget.message')}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-3 h-3 bg-white dark:bg-gray-800"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label={t('whatsappWidget.ariaLabel')}
      >
        {/* Pulsing ring animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-8 h-8 text-white relative z-10" />

        {/* Notification badge */}
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <span className="text-white text-xs font-bold">1</span>
        </motion.div>
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;
