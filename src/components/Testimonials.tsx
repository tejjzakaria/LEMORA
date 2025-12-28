import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { FadeInWhenVisible } from "@/components/animations/FadeInWhenVisible";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "فاطمة الزهراء",
      location: "الدار البيضاء",
      rating: 5,
      text: "والله المنتجات ديال ليمورا روعة، خصوصا زيت الشعر. شعري ولا ناعم و لامع بزاف. نصحكم بيه بزاف",
      product: "زيت الشعر بالأرغان",
    },
    {
      name: "سلمى",
      location: "الرباط",
      rating: 5,
      text: "جربت زيت الجسم و كنت متخوفة شوية، ولكن صراحة النتيجة فاقت التوقعات. بشرتي ولات رطبة و ناعمة كتر من قبل. شكرا ليمورا",
      product: "زيت الجسم المغذي",
    },
    {
      name: "مريم",
      location: "مراكش",
      rating: 5,
      text: "أحسن منتج استعملتو للبشرة! طبيعي 100% و النتيجة باينة من أول استعمال. الجودة ممتازة و التوصيل كان سريع",
      product: "سيروم الوجه",
    },
    {
      name: "خديجة",
      location: "طنجة",
      rating: 5,
      text: "كنت كنعاني من مشاكل فالشعر، جربت بزاف ديال المنتجات. ولكن المنتجات ديال ليمورا هوما لي عطاو نتيجة حقيقية. شكرا بزاف",
      product: "زيت فروة الرأس",
    },
    {
      name: "ياسمين",
      location: "فاس",
      rating: 5,
      text: "المنتجات طبيعية و الريحة ديالهم زوينة بزاف. كنستعمل الزيوت ديالهم كل يوم و النتيجة واضحة. الله يبارك",
      product: "مجموعة الزيوت الطبيعية",
    },
    {
      name: "هند",
      location: "أكادير",
      rating: 5,
      text: "التوصيل كان سريع و المنتج جا معبق مزيان. الجودة عالية و السعر معقول. غادي نعاود نشري من عندهم بلا تردد",
      product: "زيت الأرغان النقي",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-soft-pink/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <span className="inline-block font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
              {t('testimonials.subtitle')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              {t('testimonials.description')}
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <motion.div
                className="relative bg-card border border-border rounded-lg p-8 shadow-card hover:shadow-hover transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-body text-foreground mb-6 leading-relaxed text-right" dir="rtl">
                  "{testimonial.text}"
                </p>

                {/* Product */}
                <p className="text-xs text-primary mb-4 text-right" dir="rtl">
                  {testimonial.product}
                </p>

                {/* Divider */}
                <div className="border-t border-border my-4"></div>

                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div className="text-right flex-1" dir="rtl">
                    <p className="font-heading text-sm text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-rose flex items-center justify-center text-white font-heading">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
