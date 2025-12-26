import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/productTypes';
import { Eye, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { t } = useLanguage();

  return (
    <Link to={`/product/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
      <Card className="group relative overflow-hidden border-0 shadow-card hover-lift will-change-transform cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.isNew && (
              <Badge className="bg-gradient-rose text-white border-0 shadow-glow">
                {t('featured.newBadge')}
              </Badge>
            )}
            {product.discountPrice && (
              <Badge variant="destructive" className="shadow-soft">
                {t('featured.saleBadge')}
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="icon"
                variant="ghost"
                className="bg-white/90 hover:bg-white shadow-soft"
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isWishlisted ? 'fill-rose-gold text-rose-gold' : ''
                  }`}
                />
              </Button>
            </motion.div>
          </div>

          {/* View Product Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full flex items-center justify-center gap-3"
              initial={{ y: 20 }}
              animate={{ y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 px-6 py-3 bg-white text-foreground rounded-sm font-body text-sm tracking-wider uppercase shadow-glow-intense">
                <Eye className="w-4 h-4" />
                {t('featured.viewProduct')}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-body">
            {product.category}
          </p>
          <h3 className="font-heading text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            {product.price && (
              <span className="font-semibold text-lg text-foreground">
                {product.price} DH
              </span>
            )}
            {product.discountPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.discountPrice} DH
              </span>
            )}
          </div>
        </div>
      </Card>
      </motion.div>
    </Link>
  );
}
