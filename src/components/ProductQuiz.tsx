import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProductData } from "@/hooks/useProductData";
import { ProductCard } from "@/components/product/ProductCard";

interface QuizAnswer {
  questionId: number;
  answerId: string;
}

const ProductQuiz = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLanguage();
  const { products } = useProductData();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 0,
      question: t('productQuiz.questions.0.question'),
      options: [
        { id: 'hair', label: t('productQuiz.questions.0.options.0'), category: 'Hair & Scalp Oils' },
        { id: 'skin', label: t('productQuiz.questions.0.options.1'), category: 'Skincare' },
        { id: 'body', label: t('productQuiz.questions.0.options.2'), category: 'Body Oils' },
        { id: 'all', label: t('productQuiz.questions.0.options.3'), category: 'all' },
      ],
    },
    {
      id: 1,
      question: t('productQuiz.questions.1.question'),
      options: [
        { id: 'dry', label: t('productQuiz.questions.1.options.0') },
        { id: 'oily', label: t('productQuiz.questions.1.options.1') },
        { id: 'combination', label: t('productQuiz.questions.1.options.2') },
        { id: 'normal', label: t('productQuiz.questions.1.options.3') },
      ],
    },
    {
      id: 2,
      question: t('productQuiz.questions.2.question'),
      options: [
        { id: 'hydration', label: t('productQuiz.questions.2.options.0') },
        { id: 'repair', label: t('productQuiz.questions.2.options.1') },
        { id: 'glow', label: t('productQuiz.questions.2.options.2') },
        { id: 'strength', label: t('productQuiz.questions.2.options.3') },
      ],
    },
  ];

  const handleAnswer = (questionId: number, answerId: string) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === questionId);

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId, answerId };
    } else {
      newAnswers.push({ questionId, answerId });
    }

    setAnswers(newAnswers);

    // Auto-advance to next question
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      // Show results
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const getRecommendedProducts = () => {
    // Get category from first question
    const categoryAnswer = answers.find(a => a.questionId === 0);
    const selectedOption = questions[0].options.find(opt => opt.id === categoryAnswer?.answerId);

    let filtered = products;

    if (selectedOption?.category && selectedOption.category !== 'all') {
      filtered = products.filter(p => p.category === selectedOption.category);
    }

    // Return top 4 products
    return filtered.slice(0, 4);
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = answers.some(a => a.questionId === currentStep);
  const recommendedProducts = getRecommendedProducts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-rose flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-xl text-foreground">
                {t('productQuiz.title')}
              </h2>
              {!showResults && (
                <p className="text-xs text-muted-foreground">
                  {t('productQuiz.step')} {currentStep + 1} {t('productQuiz.of')} {questions.length}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress Bar */}
        {!showResults && (
          <div className="px-6 pt-4">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-rose"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question */}
                <h3 className="font-heading text-2xl text-foreground mb-8 text-center">
                  {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers.find(a => a.questionId === currentStep)?.answerId === option.id;

                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => handleAnswer(currentStep, option.id)}
                        className={`p-6 rounded-lg border-2 transition-all duration-300 text-left ${
                          isSelected
                            ? 'border-primary bg-gradient-subtle shadow-glow'
                            : 'border-border hover:border-primary/50 hover:bg-secondary'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-body text-foreground">
                          {option.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t('productQuiz.back')}
                  </Button>

                  {currentStep === questions.length - 1 && isAnswered && (
                    <Button
                      onClick={() => setShowResults(true)}
                      className="gap-2 bg-gradient-rose"
                    >
                      {t('productQuiz.seeResults')}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Results */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-rose mb-4"
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-heading text-3xl text-foreground mb-2">
                    {t('productQuiz.resultsTitle')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('productQuiz.resultsDescription')}
                  </p>
                </div>

                {/* Recommended Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recommendedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {/* Retake Quiz */}
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep(0);
                      setAnswers([]);
                      setShowResults(false);
                    }}
                    className="gap-2"
                  >
                    {t('productQuiz.retake')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductQuiz;
