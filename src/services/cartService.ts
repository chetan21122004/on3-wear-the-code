import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type CartItem = Database['public']['Tables']['cart']['Row']
type CartItemInsert = Database['public']['Tables']['cart']['Insert']
type CartItemUpdate = Database['public']['Tables']['cart']['Update']

export interface CartItemWithProduct extends CartItem {
  products: {
    id: string
    title: string
    price: number
    slug: string
  } | null
  product_variants?: {
    id: string
    size: string | null
    color: string | null
    price: number | null
    sku: string | null
  } | null
}

export interface CartSummary {
  totalItems: number
  subtotal: number
  total: number
}

export const cartService = {
  // Get all cart items for a user
  async getCartItems(userId: string): Promise<CartItemWithProduct[]> {
    const { data, error } = await supabase
      .from('cart')
      .select(`
        *,
        products (
          id,
          title,
          price,
          slug
        ),
        product_variants (
          id,
          size,
          color,
          price,
          sku
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching cart items:', error)
      throw error
    }

    return data || []
  },

  // Get cart summary (totals)
  async getCartSummary(userId: string): Promise<CartSummary> {
    const { data, error } = await supabase
      .from('cart')
      .select(`
        quantity,
        products (price),
        product_variants (price)
      `)
      .eq('user_id', userId)

    if (error) {
      console.error('Error fetching cart summary:', error)
      throw error
    }

    if (!data || data.length === 0) {
      return {
        totalItems: 0,
        subtotal: 0,
        total: 0
      }
    }

    const totalItems = data.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = data.reduce((sum, item) => {
      const price = item.product_variants?.price || item.products?.price || 0
      return sum + (price * item.quantity)
    }, 0)

    return {
      totalItems,
      subtotal,
      total: subtotal // Add tax calculation here if needed
    }
  },

  // Get cart item count
  async getCartItemCount(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from('cart')
      .select('quantity')
      .eq('user_id', userId)

    if (error) {
      console.error('Error fetching cart item count:', error)
      throw error
    }

    return data?.reduce((sum, item) => sum + item.quantity, 0) || 0
  },

  // Add item to cart
  async addToCart(
    userId: string, 
    productId: string, 
    variantId?: string, 
    quantity: number = 1
  ): Promise<CartItem> {
    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .single()

    if (existingItem) {
      // Update existing item quantity
      const { data, error } = await supabase
        .from('cart')
        .update({ 
          quantity: existingItem.quantity + quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingItem.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating cart item:', error)
        throw error
      }

      return data
    } else {
      // Add new item to cart
      const { data, error } = await supabase
        .from('cart')
        .insert({
          user_id: userId,
          product_id: productId,
          variant_id: variantId || null,
          quantity
        })
        .select()
        .single()

      if (error) {
        console.error('Error adding to cart:', error)
        throw error
      }

      return data
    }
  },

  // Update cart item quantity
  async updateCartItemQuantity(cartItemId: string, quantity: number): Promise<CartItem> {
    if (quantity <= 0) {
      return this.removeFromCart(cartItemId)
    }

    const { data, error } = await supabase
      .from('cart')
      .update({ 
        quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', cartItemId)
      .select()
      .single()

    if (error) {
      console.error('Error updating cart item quantity:', error)
      throw error
    }

    return data
  },

  // Remove item from cart
  async removeFromCart(cartItemId: string): Promise<void> {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', cartItemId)

    if (error) {
      console.error('Error removing from cart:', error)
      throw error
    }
  },

  // Clear entire cart
  async clearCart(userId: string): Promise<void> {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', userId)

    if (error) {
      console.error('Error clearing cart:', error)
      throw error
    }
  },

  // Move cart item to wishlist
  async moveToWishlist(cartItemId: string, userId: string): Promise<void> {
    // Get cart item details
    const { data: cartItem, error: fetchError } = await supabase
      .from('cart')
      .select('product_id')
      .eq('id', cartItemId)
      .single()

    if (fetchError) {
      console.error('Error fetching cart item:', fetchError)
      throw fetchError
    }

    // Add to wishlist
    const { error: wishlistError } = await supabase
      .from('wishlist')
      .insert({
        user_id: userId,
        product_id: cartItem.product_id
      })

    if (wishlistError && wishlistError.code !== '23505') { // Ignore duplicate key error
      console.error('Error adding to wishlist:', wishlistError)
      throw wishlistError
    }

    // Remove from cart
    await this.removeFromCart(cartItemId)
  }
}
