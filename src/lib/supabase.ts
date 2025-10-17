import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper types for easier usage
export type User = Database['public']['Tables']['users']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Collection = Database['public']['Tables']['collections']['Row']
export type CartItem = Database['public']['Tables']['cart']['Row']
export type WishlistItem = Database['public']['Tables']['wishlist']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type Address = Database['public']['Tables']['addresses']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type ProductImage = Database['public']['Tables']['product_images']['Row']
export type ProductVariant = Database['public']['Tables']['product_variants']['Row']
export type DiscountCode = Database['public']['Tables']['discount_codes']['Row']
export type Transaction = Database['public']['Tables']['transactions']['Row']
export type Blog = Database['public']['Tables']['blogs']['Row']
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
export type AdminSetting = Database['public']['Tables']['admin_settings']['Row']

// Insert types
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type CollectionInsert = Database['public']['Tables']['collections']['Insert']
export type CartItemInsert = Database['public']['Tables']['cart']['Insert']
export type WishlistItemInsert = Database['public']['Tables']['wishlist']['Insert']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']
export type AddressInsert = Database['public']['Tables']['addresses']['Insert']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']
export type ProductImageInsert = Database['public']['Tables']['product_images']['Insert']
export type ProductVariantInsert = Database['public']['Tables']['product_variants']['Insert']
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert']
export type BlogInsert = Database['public']['Tables']['blogs']['Insert']
export type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert']

// Update types
export type ProductUpdate = Database['public']['Tables']['products']['Update']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']
export type CollectionUpdate = Database['public']['Tables']['collections']['Update']
export type CartItemUpdate = Database['public']['Tables']['cart']['Update']
export type OrderUpdate = Database['public']['Tables']['orders']['Update']
export type AddressUpdate = Database['public']['Tables']['addresses']['Update']
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update']
export type ProductImageUpdate = Database['public']['Tables']['product_images']['Update']
export type ProductVariantUpdate = Database['public']['Tables']['product_variants']['Update']
