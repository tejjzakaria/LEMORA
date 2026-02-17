/**
 * Site Configuration
 *
 * Update all your site details, contact information, and content here.
 * This file controls all the text and data across the website.
 */

export const siteConfig = {
  // ===== BASIC INFO =====
  siteName: "FLORIYA Cosmetics",
  tagline: "Luxury Beauty Reimagined",
  description: "Premium natural oils and cosmetics crafted with the finest botanical ingredients",

  // ===== CONTACT INFORMATION =====
  contact: {
    email: "contact@FLORIYAcosmetics.com",
    phone: "+212 690-830144",
    whatsapp: "+212690830144", // No spaces or special characters
    address: {
      street: "123 Beauty Avenue",
      city: "Casablanca",
      country: "Morocco",
      postalCode: "20000",
    },
    // Social Media Links
    social: {
      facebook: "https://facebook.com/FLORIYAcosmetics",
      instagram: "https://www.instagram.com/floriyabodyoil/",
      twitter: "https://twitter.com/FLORIYAcosmetics",
      tiktok: "https://tiktok.com/@FLORIYAcosmetics",
      youtube: "https://youtube.com/@FLORIYAcosmetics",
    },
  },

  // ===== BUSINESS HOURS =====
  businessHours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
    saturday: "Saturday: 10:00 AM - 4:00 PM",
    sunday: "Sunday: Closed",
  },

  // ===== ABOUT PAGE CONTENT =====
  about: {
    heroTitle: "Beauty Born from Pure Passion",
    heroSubtitle: "Our Story",
    story: [
      "At FLORIYA, we believe that true beauty comes from within. Founded with a passion for creating exceptional natural cosmetics, we combine the finest botanical ingredients with traditional formulations to deliver products that not only enhance your natural beauty but also nurture your skin.",
      "Every FLORIYA product is crafted with care, tested rigorously, and designed to make you feel confident and radiant. Our commitment to sustainability and ethical practices ensures that your beauty routine aligns with your values.",
      "We source our ingredients from trusted suppliers who share our values of quality, sustainability, and ethical sourcing. Each product undergoes rigorous testing to ensure it meets our high standards of excellence.",
    ],
    mission: {
      title: "Our Mission",
      text: "To provide premium, natural beauty products that empower individuals to embrace their authentic selves while respecting the planet and all its inhabitants.",
    },
    values: [
      {
        title: "Natural Ingredients",
        description: "We use only the finest botanical ingredients, sourced sustainably and ethically.",
      },
      {
        title: "Cruelty-Free",
        description: "All our products are 100% cruelty-free. We never test on animals.",
      },
      {
        title: "Sustainability",
        description: "We're committed to sustainable practices in every aspect of our business.",
      },
      {
        title: "Quality First",
        description: "Every product is rigorously tested to meet our highest standards of excellence.",
      },
    ],
    stats: [
      { value: 50, suffix: "+", label: "Premium Products" },
      { value: 100, suffix: "%", label: "Natural Ingredients" },
      { value: 25, suffix: "k+", label: "Happy Customers" },
    ],
    team: {
      title: "Meet Our Team",
      description: "Passionate experts dedicated to bringing you the best in natural beauty.",
    },
  },

  // ===== NEWSLETTER =====
  newsletter: {
    title: "Join the FLORIYA Family",
    subtitle: "Stay Connected",
    description: "Subscribe for exclusive access to new launches, beauty tips, and special offers reserved just for you.",
    disclaimer: "By subscribing, you agree to receive marketing emails. Unsubscribe anytime.",
  },

  // ===== FOOTER =====
  footer: {
    copyrightYear: new Date().getFullYear(),
    copyrightText: "All rights reserved.",
    links: {
      shop: [
        { name: "All Products", href: "/shop" },
        { name: "Hair & Scalp Oils", href: "/shop?category=hair" },
        { name: "Body Oils", href: "/shop?category=body" },
        { name: "Skincare", href: "/shop?category=skincare" },
      ],
      company: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Our Story", href: "/about#story" },
      ],
      support: [
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
        { name: "FAQ", href: "/faq" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  },

  // ===== SEO & META =====
  seo: {
    keywords: ["natural cosmetics", "organic beauty", "moroccan beauty", "essential oils", "luxury skincare"],
    ogImage: "/og-image.jpg", // Update this with your actual OG image path
  },
};

export default siteConfig;
