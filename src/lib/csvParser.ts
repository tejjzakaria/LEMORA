import Papa from 'papaparse';
import { Product, ProductCategory, ParsedCSVRow } from './productTypes';

const CSV_FILES = [
  '/products/Thunderbit_d91ddc_20251226_180145.csv',
  '/products/Thunderbit_d91ddc_20251226_180244.csv',
  '/products/Thunderbit_d91ddc_20251226_180327.csv',
  '/products/Thunderbit_d91ddc_20251226_180359.csv',
];

/**
 * Detects product category from product name (in Arabic)
 */
function detectCategory(productName: string): ProductCategory {
  const nameLower = productName.toLowerCase();

  // Hair & Scalp keywords
  if (
    nameLower.includes('hair') ||
    nameLower.includes('scalp') ||
    nameLower.includes('rosemary') ||
    nameLower.includes('روزماري') ||
    nameLower.includes('شعر') ||
    nameLower.includes('فروة')
  ) {
    return 'Hair & Scalp Oils';
  }

  // Body oil keywords
  if (
    nameLower.includes('body oil') ||
    nameLower.includes('massage') ||
    nameLower.includes('bath') ||
    nameLower.includes('للجسم') ||
    nameLower.includes('jasmine') ||
    nameLower.includes('chamomile') ||
    nameLower.includes('lemongrass') ||
    nameLower.includes('cinnamon') ||
    nameLower.includes('lavender') ||
    nameLower.includes('peppermint')
  ) {
    return 'Body Oils';
  }

  // Skincare keywords
  if (
    nameLower.includes('toner') ||
    nameLower.includes('facial') ||
    nameLower.includes('argan') ||
    nameLower.includes('rose water') ||
    nameLower.includes('البشرة') ||
    nameLower.includes('تونر')
  ) {
    return 'Skincare';
  }

  return 'Other';
}

/**
 * Parses price string to number (handles empty strings)
 */
function parsePrice(priceStr: string): number | null {
  if (!priceStr || priceStr.trim() === '') {
    return null;
  }
  const parsed = parseFloat(priceStr);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Loads a single CSV file and returns parsed rows
 */
async function loadCSVFile(filePath: string): Promise<ParsedCSVRow[]> {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse<ParsedCSVRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error(`Error loading CSV file ${filePath}:`, error);
    return [];
  }
}

/**
 * Transforms parsed CSV row to Product type
 */
function transformToProduct(row: ParsedCSVRow, index: number): Product {
  const name = row['اسم المنتج'];
  const url = row['رابط المنتج'];
  const imageUrl = row['صورة المنتج'];
  const price = parsePrice(row['السعر (درهم مغربي)']);
  const discountPrice = parsePrice(row['السعر قبل الخصم (درهم مغربي)']);

  // Generate unique ID from URL or index
  const id = url ? url.split('/').pop() || `product-${index}` : `product-${index}`;

  // Detect if product is new (check for NEW in name)
  const isNew = name.toLowerCase().includes('new');

  // Mark first few products as featured (we'll use first 8)
  const isFeatured = index < 8;

  return {
    id,
    name,
    url,
    imageUrl,
    price,
    discountPrice,
    category: detectCategory(name),
    isNew,
    isFeatured,
  };
}

/**
 * Loads all CSV files, combines and deduplicates products
 */
export async function loadAllProducts(): Promise<Product[]> {
  try {
    // Load all CSV files in parallel
    const allRows = await Promise.all(
      CSV_FILES.map((file) => loadCSVFile(file))
    );

    // Flatten all rows into single array
    const flatRows = allRows.flat();

    // Transform to Product type
    const products = flatRows.map((row, index) => transformToProduct(row, index));

    // Remove duplicates by name (keep first occurrence)
    const uniqueProducts = products.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.name === product.name)
    );

    // Sort by category, then by name
    uniqueProducts.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.name.localeCompare(b.name);
    });

    console.log(`Loaded ${uniqueProducts.length} unique products from ${CSV_FILES.length} CSV files`);

    return uniqueProducts;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}
