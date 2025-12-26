import { useState, useEffect, useMemo } from 'react';
import { loadAllProducts } from '@/lib/csvParser';
import { Product, ProductCategory } from '@/lib/productTypes';

interface UseProductDataReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  featured: Product[];
  byCategory: (category: ProductCategory) => Product[];
  categories: ProductCategory[];
}

export function useProductData(): UseProductDataReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadAllProducts()
      .then((loadedProducts) => {
        setProducts(loadedProducts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Get featured products (memoized)
  const featured = useMemo(
    () => products.filter((p) => p.isFeatured),
    [products]
  );

  // Get all unique categories (memoized)
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    );
    return uniqueCategories.sort();
  }, [products]);

  // Function to filter products by category
  const byCategory = useMemo(
    () => (category: ProductCategory) =>
      products.filter((p) => p.category === category),
    [products]
  );

  return {
    products,
    loading,
    error,
    featured,
    byCategory,
    categories,
  };
}
