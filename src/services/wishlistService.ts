import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type WishlistItem = Database['public']['Tables']['wishlist']['Row']
type WishlistItemInsert = Database['public']['Tables']['wishlist']['Insert']

export interface WishlistItemWithProduct extends WishlistItem {
  products: {
    id: string
    title: string
    price: number
    slug: string
    description?: string | null
    category_id?: string | null
  } | null
}

export const wishlistService = {
  // Get all wishlist items for a user
  async getWishlistItems(userId: string): Promise<WishlistItemWithProduct[]> {
    const { data, error } = await supabase
      .from('wishlist')
      .select(`
        *,
        products (
          id,
          title,
          price,
          slug,
          description,
          category_id
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching wishlist items:', error)
      throw error
    }

    return data || []
  },

  // Get wishlist item count
  async getWishlistItemCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('wishlist')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (error) {
      console.error('Error fetching wishlist item count:', error)
      throw error
    }

    return count || 0
  },

  // Check if product is in wishlist
  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking wishlist:', error)
      throw error
    }

    return !!data
  },

  // Add item to wishlist
  async addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
    const { data, error } = await supabase
      .from('wishlist')
      .insert({
        user_id: userId,
        product_id: productId
      })
      .select()
      .single()

    if (error) {
      // If it's a duplicate key error, just return the existing item
      if (error.code === '23505') {
        const { data: existingItem } = await supabase
          .from('wishlist')
          .select('*')
          .eq('user_id', userId)
          .eq('product_id', productId)
          .single()
        
        if (existingItem) {
          return existingItem
        }
      }
      
      console.error('Error adding to wishlist:', error)
      throw error
    }

    return data
  },

  // Remove item from wishlist
  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)

    if (error) {
      console.error('Error removing from wishlist:', error)
      throw error
    }
  },

  // Clear entire wishlist
  async clearWishlist(userId: string): Promise<void> {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)

    if (error) {
      console.error('Error clearing wishlist:', error)
      throw error
    }
  },

  // Move wishlist item to cart
  async moveToCart(userId: string, productId: string, quantity: number = 1): Promise<void> {
    // Add to cart
    const { error: cartError } = await supabase
      .from('cart')
      .insert({
        user_id: userId,
        product_id: productId,
        quantity
      })

    if (cartError && cartError.code !== '23505') { // Ignore duplicate key error
      console.error('Error adding to cart:', cartError)
      throw cartError
    }

    // Remove from wishlist
    await this.removeFromWishlist(userId, productId)
  }
}
