import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { collectionService, CollectionWithProductCount } from '@/services/collectionService'
import type { Database } from '@/lib/database.types'

type Collection = Database['public']['Tables']['collections']['Row']

// Query keys for collections
export const collectionKeys = {
  all: ['collections'] as const,
  lists: () => [...collectionKeys.all, 'list'] as const,
  list: (filters?: any) => [...collectionKeys.lists(), filters] as const,
  details: () => [...collectionKeys.all, 'detail'] as const,
  detail: (id: string) => [...collectionKeys.details(), id] as const,
}

// Get all collections
export const useCollections = (): UseQueryResult<CollectionWithProductCount[], Error> => {
  return useQuery({
    queryKey: collectionKeys.lists(),
    queryFn: () => collectionService.getCollections(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get single collection by ID
export const useCollection = (id: string): UseQueryResult<Collection | null, Error> => {
  return useQuery({
    queryKey: collectionKeys.detail(id),
    queryFn: () => collectionService.getCollectionById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get collection by slug
export const useCollectionBySlug = (slug: string): UseQueryResult<Collection | null, Error> => {
  return useQuery({
    queryKey: [...collectionKeys.details(), 'slug', slug],
    queryFn: () => collectionService.getCollectionBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get featured collections
export const useFeaturedCollections = (limit = 3): UseQueryResult<CollectionWithProductCount[], Error> => {
  return useQuery({
    queryKey: collectionKeys.list({ featured: true, limit }),
    queryFn: () => collectionService.getFeaturedCollections(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
