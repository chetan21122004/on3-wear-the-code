import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '@/services/cartService'
import { useAuth } from '@/contexts/AuthContext'

// Query keys
export const cartKeys = {
  all: ['cart'] as const,
  lists: () => [...cartKeys.all, 'list'] as const,
  list: (userId: string) => [...cartKeys.lists(), userId] as const,
  summary: (userId: string) => [...cartKeys.all, 'summary', userId] as const,
  count: (userId: string) => [...cartKeys.all, 'count', userId] as const,
}

// Get cart items
export const useCartItems = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: cartKeys.list(user?.id || ''),
    queryFn: () => cartService.getCartItems(user!.id),
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Get cart summary
export const useCartSummary = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: cartKeys.summary(user?.id || ''),
    queryFn: () => cartService.getCartSummary(user!.id),
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Get cart item count
export const useCartItemCount = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: cartKeys.count(user?.id || ''),
    queryFn: () => cartService.getCartItemCount(user!.id),
    enabled: !!user,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

// Add to cart mutation
export const useAddToCart = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ 
      productId, 
      variantId, 
      quantity = 1 
    }: { 
      productId: string
      variantId?: string
      quantity?: number 
    }) => {
      if (!user) throw new Error('User not authenticated')
      return cartService.addToCart(user.id, productId, variantId, quantity)
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: cartKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: cartKeys.summary(user.id) })
        queryClient.invalidateQueries({ queryKey: cartKeys.count(user.id) })
      }
    },
  })
}

// Update cart item quantity
export const useUpdateCartItemQuantity = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      cartService.updateCartItemQuantity(cartItemId, quantity),
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: cartKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: cartKeys.summary(user.id) })
        queryClient.invalidateQueries({ queryKey: cartKeys.count(user.id) })
      }
    },
  })
}

// Remove from cart mutation
export const useRemoveFromCart = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cartItemId: string) => cartService.removeFromCart(cartItemId),
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: cartKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: cartKeys.summary(user.id) })
        queryClient.invalidateQueries({ queryKey: cartKeys.count(user.id) })
      }
    },
  })
}

// Clear cart mutation
export const useClearCart = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      if (!user) throw new Error('User not authenticated')
      return cartService.clearCart(user.id)
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: cartKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: cartKeys.summary(user.id) })
        queryClient.invalidateQueries({ queryKey: cartKeys.count(user.id) })
      }
    },
  })
}

// Move to wishlist mutation
export const useMoveToWishlist = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cartItemId: string) => {
      if (!user) throw new Error('User not authenticated')
      return cartService.moveToWishlist(cartItemId, user.id)
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: cartKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: cartKeys.summary(user.id) })
        queryClient.invalidateQueries({ queryKey: cartKeys.count(user.id) })
        // Also invalidate wishlist queries
        queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      }
    },
  })
}
