export interface Bundle {
  id: string;
  name: string;
  slug: string;
  description: string;
  detailedDescription: string;
  products: string[];
  images: string[];
  originalPrice: number;
  bundlePrice: number;
  discount: number;
  badge: string;
  gradient: string;
  benefits: string[];
  whatsIncluded: {
    item: string;
    description: string;
  }[];
  category: 'hair-care' | 'skincare' | 'luxury';
}

export const bundles: Bundle[] = [
  {
    id: 'hair-care-ritual',
    slug: 'complete-hair-care-ritual',
    name: 'Complete Hair Care Ritual',
    description: 'Everything you need for healthy, shiny hair',
    detailedDescription: 'Transform your hair care routine with our Complete Hair Care Ritual bundle. This carefully curated collection combines our best-selling hair treatments to give you salon-quality results at home. From deep nourishment to scalp health, this bundle covers all your hair care needs.',
    products: [
      'Argan Oil Hair Treatment (100ml)',
      'Rosemary Scalp Oil (50ml)',
      'Natural Hair Serum (30ml)',
    ],
    images: [
      'https://lemoracosmetics.com/cdn/shop/files/IMG_9845_1.jpg?v=1713770822&width=533',
      'https://lemoracosmetics.com/cdn/shop/files/IMG_8913.jpg?v=1711073961&width=533',
      'https://lemoracosmetics.com/cdn/shop/files/IMG_9243.jpg?v=1709701933&width=533',
    ],
    originalPrice: 600,
    bundlePrice: 510,
    discount: 15,
    badge: 'Popular',
    gradient: 'from-amber-500 to-orange-600',
    benefits: [
      'Deeply nourishes and repairs damaged hair',
      'Promotes healthy scalp and hair growth',
      'Adds natural shine and softness',
      'Reduces frizz and split ends',
      'Strengthens hair from root to tip',
      ' 100% natural, no harsh chemicals',
    ],
    whatsIncluded: [
      {
        item: 'Argan Oil Hair Treatment (100ml)',
        description: 'Morocco\'s liquid gold, rich in vitamin E and fatty acids. Deeply moisturizes and restores shine to dry, damaged hair.',
      },
      {
        item: 'Rosemary Scalp Oil (50ml)',
        description: 'Stimulates hair growth and improves scalp health. Natural anti-inflammatory properties soothe irritation.',
      },
      {
        item: 'Natural Hair Serum (30ml)',
        description: 'Lightweight serum that tames frizz and adds brilliant shine. Perfect for daily use on all hair types.',
      },
    ],
    category: 'hair-care',
  },
  {
    id: 'complete-skincare',
    slug: 'complete-skincare-set',
    name: 'Complete Skincare Set',
    description: 'Full routine for radiant, glowing skin',
    detailedDescription: 'Achieve your best skin yet with our Complete Skincare Set. This comprehensive collection brings together powerful natural ingredients to cleanse, nourish, and protect your skin. Perfect for those seeking a complete skincare routine that delivers visible results.',
    products: [
      'Face Oil Blend (50ml)',
      'Vitamin E Serum (30ml)',
      'Moisturizing Body Oil (100ml)',
    ],
    images: [
      'https://lemoracosmetics.com/cdn/shop/files/IMG_0900.jpg?v=1725239726&width=533',
      'https://lemoracosmetics.com/cdn/shop/files/IMG_9845_1.jpg?v=1713770822&width=533',
      'https://lemoracosmetics.com/cdn/shop/files/IMG_8913.jpg?v=1711073961&width=533',
    ],
    originalPrice: 750,
    bundlePrice: 638,
    discount: 15,
    badge: 'Bestseller',
    gradient: 'from-pink-500 to-rose-600',
    benefits: [
      'Brightens and evens skin tone',
      'Reduces fine lines and wrinkles',
      'Deeply hydrates and nourishes',
      'Protects against environmental damage',
      'Improves skin texture and elasticity',
      'Suitable for all skin types',
    ],
    whatsIncluded: [
      {
        item: 'Face Oil Blend (50ml)',
        description: 'Luxurious blend of essential oils that balances, nourishes, and rejuvenates facial skin. Non-comedogenic and fast-absorbing.',
      },
      {
        item: 'Vitamin E Serum (30ml)',
        description: 'Powerful antioxidant serum that fights free radicals and reduces signs of aging. Promotes collagen production.',
      },
      {
        item: 'Moisturizing Body Oil (100ml)',
        description: 'Silky body oil that locks in moisture and leaves skin soft and supple. Perfect for after-shower application.',
      },
    ],
    category: 'skincare',
  },
  {
    id: 'luxury-collection',
    slug: 'luxury-collection',
    name: 'Luxury Collection',
    description: 'Our premium selection for head-to-toe care',
    detailedDescription: 'Indulge in the ultimate beauty experience with our Luxury Collection. This premium bundle features our finest products, carefully selected to provide complete head-to-toe care. Packaged in an elegant gift box, it\'s perfect for treating yourself or gifting to someone special.',
    products: [
      'Premium Argan Oil (100ml)',
      'Complete Facial Care Set',
      'Body Care Collection',
      'Free Premium Gift Box',
    ],
    images: [
      'https://lemoracosmetics.com/cdn/shop/files/IMG_9243.jpg?v=1709701933&width=533',
      'https://lemoracosmetics.com/cdn/shop/files/IMG_0900.jpg?v=1725239726&width=533',
      'https://lemoracosmetics.com/cdn/shop/files/IMG_9845_1.jpg?v=1713770822&width=533',
    ],
    originalPrice: 1000,
    bundlePrice: 850,
    discount: 15,
    badge: 'Premium',
    gradient: 'from-purple-500 to-indigo-600',
    benefits: [
      'Complete beauty routine in one package',
      'Premium quality ingredients',
      'Luxurious packaging perfect for gifting',
      'Comprehensive head-to-toe care',
      'Maximum value - save 150 MAD',
      'Exclusive products not sold individually',
    ],
    whatsIncluded: [
      {
        item: 'Premium Argan Oil (100ml)',
        description: 'The finest cold-pressed argan oil from Morocco. Multi-purpose oil for hair, skin, and nails. Pure and unrefined.',
      },
      {
        item: 'Complete Facial Care Set',
        description: 'Includes face oil, vitamin serum, and eye treatment. Everything you need for a complete facial routine.',
      },
      {
        item: 'Body Care Collection',
        description: 'Luxurious body oils and moisturizers that pamper your skin from head to toe. Spa-quality results at home.',
      },
      {
        item: 'Premium Gift Box',
        description: 'Beautifully packaged in an elegant gift box with ribbon. Perfect for special occasions or self-care.',
      },
    ],
    category: 'luxury',
  },
];

export function getBundleBySlug(slug: string): Bundle | undefined {
  return bundles.find((bundle) => bundle.slug === slug);
}

export function getBundleById(id: string): Bundle | undefined {
  return bundles.find((bundle) => bundle.id === id);
}
