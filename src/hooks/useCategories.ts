import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { categoryService, CategoryWithProductCount } from '@/services/categoryService'
import type { Database } from '@/lib/database.types'

type Category = Database['public']['Tables']['categories']['Row']

// Query keys for categories
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters?: any) => [...categoryKeys.lists(), filters] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
}

// Get all categories
export const useCategories = (): UseQueryResult<CategoryWithProductCount[], Error> => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: () => categoryService.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get single category by ID
export const useCategory = (id: string): UseQueryResult<Category | null, Error> => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryService.getCategoryById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get category by slug
export const useCategoryBySlug = (slug: string): UseQueryResult<Category | null, Error> => {
  return useQuery({
    queryKey: [...categoryKeys.details(), 'slug', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
