export interface Product {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
  price: number | null;
  discountPrice: number | null;
  category: ProductCategory;
  isNew?: boolean;
  isFeatured?: boolean;
}

export type ProductCategory =
  | 'Hair & Scalp Oils'
  | 'Body Oils'
  | 'Skincare'
  | 'Other';

export interface ParsedCSVRow {
  'اسم المنتج': string;
  'رابط المنتج': string;
  'صورة المنتج': string;
  'السعر (درهم مغربي)': string;
  'السعر قبل الخصم (درهم مغربي)': string;
}
