import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { wishlistService } from '@/services/wishlistService'
import { useAuth } from '@/contexts/AuthContext'

// Query keys
export const wishlistKeys = {
  all: ['wishlist'] as const,
  lists: () => [...wishlistKeys.all, 'list'] as const,
  list: (userId: string) => [...wishlistKeys.lists(), userId] as const,
  count: (userId: string) => [...wishlistKeys.all, 'count', userId] as const,
  check: (userId: string, productId: string) => 
    [...wishlistKeys.all, 'check', userId, productId] as const,
}

// Get wishlist items
export const useWishlistItems = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: wishlistKeys.list(user?.id || ''),
    queryFn: () => wishlistService.getWishlistItems(user!.id),
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get wishlist item count
export const useWishlistItemCount = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: wishlistKeys.count(user?.id || ''),
    queryFn: () => wishlistService.getWishlistItemCount(user!.id),
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Check if item is in wishlist
export const useIsInWishlist = (productId: string) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: wishlistKeys.check(user?.id || '', productId),
    queryFn: () => wishlistService.isInWishlist(user!.id, productId),
    enabled: !!user && !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Add to wishlist mutation
export const useAddToWishlist = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => {
      if (!user) throw new Error('User not authenticated')
      return wishlistService.addToWishlist(user.id, productId)
    },
    onSuccess: (_, productId) => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: wishlistKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: wishlistKeys.count(user.id) })
        queryClient.invalidateQueries({ queryKey: wishlistKeys.check(user.id, productId) })
      }
    },
  })
}

// Remove from wishlist mutation
export const useRemoveFromWishlist = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => {
      if (!user) throw new Error('User not authenticated')
      return wishlistService.removeFromWishlist(user.id, productId)
    },
    onSuccess: (_, productId) => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: wishlistKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: wishlistKeys.count(user.id) })
        queryClient.invalidateQueries({ queryKey: wishlistKeys.check(user.id, productId) })
      }
    },
  })
}

// Toggle wishlist mutation (add if not in wishlist, remove if in wishlist)
export const useToggleWishlist = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId, isInWishlist }: { productId: string; isInWishlist: boolean }) => {
      if (!user) throw new Error('User not authenticated')
      
      if (isInWishlist) {
        return wishlistService.removeFromWishlist(user.id, productId)
      } else {
        return wishlistService.addToWishlist(user.id, productId)
      }
    },
    onSuccess: (_, { productId }) => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: wishlistKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: wishlistKeys.count(user.id) })
        queryClient.invalidateQueries({ queryKey: wishlistKeys.check(user.id, productId) })
      }
    },
  })
}

// Clear wishlist mutation
export const useClearWishlist = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      if (!user) throw new Error('User not authenticated')
      return wishlistService.clearWishlist(user.id)
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: wishlistKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: wishlistKeys.count(user.id) })
        queryClient.invalidateQueries({ queryKey: wishlistKeys.all })
      }
    },
  })
}
