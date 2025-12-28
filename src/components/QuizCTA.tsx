import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductQuiz from "./ProductQuiz";

const QuizCTA = () => {
  const { t } = useLanguage();
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-rose-950/20 relative overflow-hidden">
        {/* Decorative Blobs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-300/30 blur-3xl pointer-events-none"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-pink-300/30 blur-3xl pointer-events-none"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <FadeInWhenVisible>
            <div className="max-w-3xl mx-auto text-center">
              {/* Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-rose mb-6 shadow-glow"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <HelpCircle className="w-8 h-8 text-white" />
              </motion.div>

              {/* Title */}
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                {t('quizCTA.title')}
              </h2>

              {/* Description */}
              <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('quizCTA.description')}
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  t('quizCTA.benefit1'),
                  t('quizCTA.benefit2'),
                  t('quizCTA.benefit3'),
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-primary/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-body text-foreground">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setShowQuiz(true)}
                  size="lg"
                  className="bg-gradient-rose text-white shadow-glow font-body tracking-wider uppercase gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  {t('quizCTA.button')}
                </Button>
              </motion.div>

              {/* Subtext */}
              <p className="text-xs text-muted-foreground mt-4">
                {t('quizCTA.subtext')}
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && <ProductQuiz onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>
    </>
  );
};

export default QuizCTA;
