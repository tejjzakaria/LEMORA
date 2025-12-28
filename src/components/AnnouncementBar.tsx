import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck, Leaf, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AnnouncementBar = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const announcements = [
    {
      icon: Truck,
      text: t('announcementBar.freeShipping'),
      bgClass: "bg-gradient-to-r from-green-600 to-emerald-600",
    },
    {
      icon: Leaf,
      text: t('announcementBar.naturalIngredients'),
      bgClass: "bg-gradient-to-r from-rose-600 to-pink-600",
    },
    {
      icon: Sparkles,
      text: t('announcementBar.premiumQuality'),
      bgClass: "bg-gradient-to-r from-amber-600 to-orange-600",
    },
  ];

  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isVisible, announcements.length]);

  // Check if user has closed the bar in this session
  useEffect(() => {
    const isClosed = sessionStorage.getItem('announcement-bar-closed');
    if (isClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('announcement-bar-closed', 'true');
  };

  if (!isVisible) return null;

  const currentAnnouncement = announcements[currentIndex];
  const Icon = currentAnnouncement.icon;

  return (
    <div className={`fixed top-0 left-0 right-0 z-[60] ${currentAnnouncement.bgClass} text-white transition-all duration-500`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left spacer for centering */}
          <div className="w-8 hidden sm:block" />

          {/* Announcement Content */}
          <div className="flex-1 flex items-center justify-center gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-body text-sm md:text-base tracking-wide text-center">
                  {currentAnnouncement.text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Close Button */}
          <motion.button
            onClick={handleClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close announcement"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-2">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
              aria-label={`Go to announcement ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
