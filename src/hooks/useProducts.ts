import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { productService, ProductListItem, ProductWithDetails } from '@/services/productService'

// Query keys for products
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters?: any) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
}

// Get all products
export const useProducts = (filters?: {
  category?: string
  collection?: string
  featured?: boolean
  limit?: number
  offset?: number
}): UseQueryResult<ProductListItem[], Error> => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get single product by ID
export const useProduct = (id: string): UseQueryResult<ProductWithDetails | null, Error> => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get product by slug
export const useProductBySlug = (slug: string): UseQueryResult<ProductWithDetails | null, Error> => {
  return useQuery({
    queryKey: [...productKeys.details(), 'slug', slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get featured products
export const useFeaturedProducts = (limit = 4): UseQueryResult<ProductListItem[], Error> => {
  return useQuery({
    queryKey: productKeys.list({ featured: true, limit }),
    queryFn: () => productService.getFeaturedProducts(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Search products
export const useSearchProducts = (query: string, limit = 20): UseQueryResult<ProductListItem[], Error> => {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: () => productService.searchProducts(query, limit),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Get products by category
export const useProductsByCategory = (categorySlug: string, limit?: number): UseQueryResult<ProductListItem[], Error> => {
  return useQuery({
    queryKey: productKeys.list({ category: categorySlug, limit }),
    queryFn: () => productService.getProductsByCategory(categorySlug, limit),
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get products by collection
export const useProductsByCollection = (collectionSlug: string, limit?: number): UseQueryResult<ProductListItem[], Error> => {
  return useQuery({
    queryKey: productKeys.list({ collection: collectionSlug, limit }),
    queryFn: () => productService.getProductsByCollection(collectionSlug, limit),
    enabled: !!collectionSlug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}