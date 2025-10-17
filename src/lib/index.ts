// Export Supabase client and types
export { supabase } from './supabase'
export type * from './supabase'
export type * from './database.types'

// Export services
export { productService } from '@/services/productService'
export { categoryService } from '@/services/categoryService'
export { cartService } from '@/services/cartService'
export { orderService } from '@/services/orderService'
export { wishlistService } from '@/services/wishlistService'
export { addressService } from '@/services/addressService'
export { reviewService } from '@/services/reviewService'

// Export hooks
export * from '@/hooks/useProducts'
export * from '@/hooks/useCart'
export * from '@/hooks/useOrders'
export * from '@/hooks/useWishlist'

// Export contexts
export { AuthProvider, useAuth } from '@/contexts/AuthContext'
