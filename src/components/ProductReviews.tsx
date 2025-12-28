import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, User } from "lucide-react";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  verified: boolean;
  helpful: number;
}

const ProductReviews = ({ productId }: { productId: string }) => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  // Mock reviews - in production, these would come from a database
  const allReviews: Review[] = [
    {
      id: '1',
      name: 'فاطمة',
      location: 'الدار البيضاء',
      rating: 5,
      date: '2025-01-15',
      review: 'المنتج رائع والله، جودة ممتازة و النتيجة واضحة من أول استعمال. بشرتي ولات ناعمة و لامعة بزاف',
      verified: true,
      helpful: 12,
    },
    {
      id: '2',
      name: 'سلمى',
      location: 'الرباط',
      rating: 5,
      date: '2025-01-10',
      review: 'كنستعمل هاد المنتج كل يوم، النتيجة فاقت التوقعات. التوصيل كان سريع و التعبئة مزيانة',
      verified: true,
      helpful: 8,
    },
    {
      id: '3',
      name: 'مريم',
      location: 'مراكش',
      rating: 5,
      date: '2025-01-05',
      review: 'أحسن منتج جربتو! طبيعي 100% و الريحة ديالو زوينة. كنصح بيه بزاف',
      verified: true,
      helpful: 15,
    },
    {
      id: '4',
      name: 'خديجة',
      location: 'فاس',
      rating: 4,
      date: '2024-12-28',
      review: 'منتج مزيان بصح كيخصو وقت باش تبان النتيجة. ولكن يستاهل',
      verified: true,
      helpful: 5,
    },
    {
      id: '5',
      name: 'ياسمين',
      location: 'طنجة',
      rating: 5,
      date: '2024-12-20',
      review: 'الجودة ممتازة و السعر معقول. غادي نعاود نشري بلا تردد',
      verified: true,
      helpful: 10,
    },
  ];

  const displayedReviews = showAll ? allReviews : allReviews.slice(0, 3);

  // Calculate average rating
  const averageRating = allReviews.reduce((acc, review) => acc + review.rating, 0) / allReviews.length;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: allReviews.filter((r) => r.rating === star).length,
    percentage: (allReviews.filter((r) => r.rating === star).length / allReviews.length) * 100,
  }));

  return (
    <section className="py-12 border-t border-border">
      <div className="mb-12">
        <FadeInWhenVisible>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
            {t('productReviews.title')}
          </h2>

          {/* Rating Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Average Rating */}
            <div className="flex flex-col items-center justify-center p-8 bg-gradient-subtle rounded-lg border border-border">
              <div className="text-6xl font-heading text-foreground mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(averageRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {t('productReviews.basedOn')} {allReviews.length} {t('productReviews.reviews')}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {ratingDistribution.map((dist) => (
                <div key={dist.star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-body text-foreground">{dist.star}</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${dist.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {dist.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Reviews List */}
        <div className="space-y-6">
          {displayedReviews.map((review, index) => (
            <FadeInWhenVisible key={review.id} delay={index * 0.1}>
              <motion.div
                className="p-6 bg-card border border-border rounded-lg hover:shadow-card transition-shadow duration-300"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-rose flex items-center justify-center text-white font-heading flex-shrink-0">
                      {review.name.charAt(0)}
                    </div>

                    {/* User Info */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading text-foreground">{review.name}</span>
                        {review.verified && (
                          <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                            {t('productReviews.verified')}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground" dir="rtl">
                        {review.location}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground leading-relaxed mb-4 text-right" dir="rtl">
                  {review.review}
                </p>

                {/* Helpful Button */}
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>
                    {t('productReviews.helpful')} ({review.helpful})
                  </span>
                </button>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Show More Button */}
        {allReviews.length > 3 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="gap-2"
            >
              {showAll ? t('productReviews.showLess') : t('productReviews.showMore')}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
