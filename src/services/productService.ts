import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type Product = Database['public']['Tables']['products']['Row']
type ProductImage = Database['public']['Tables']['product_images']['Row']
type ProductVariant = Database['public']['Tables']['product_variants']['Row']
type Category = Database['public']['Tables']['categories']['Row']
type Collection = Database['public']['Tables']['collections']['Row']

export interface ProductWithDetails extends Product {
  product_images: ProductImage[]
  product_variants: ProductVariant[]
  categories?: Category
  collections?: Collection
}

export interface ProductListItem {
  id: string
  title: string
  slug: string
  short_description: string | null
  price: number
  original_price: number | null
  discount_percent: number | null
  featured: boolean | null
  in_stock: boolean | null
  category_name?: string
  collection_name?: string
  primary_image?: string
  available_sizes: string[]
  available_colors: string[]
}

export const productService = {
  // Get all products with basic info for listing
  async getProducts(filters?: {
    category?: string
    collection?: string
    featured?: boolean
    limit?: number
    offset?: number
  }): Promise<ProductListItem[]> {
    let query = supabase
      .from('products')
      .select(`
        id,
        title,
        slug,
        short_description,
        price,
        original_price,
        discount_percent,
        featured,
        in_stock,
        categories (
          name
        ),
        collections (
          title
        ),
        product_images!inner (
          image_url,
          is_primary
        ),
        product_variants (
          size,
          color
        )
      `)
      .eq('product_images.is_primary', true)

    if (filters?.category) {
      query = query.eq('categories.slug', filters.category)
    }

    if (filters?.collection) {
      query = query.eq('collections.slug', filters.collection)
    }

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      throw error
    }

    return (data || []).map(product => ({
      id: product.id,
      title: product.title,
      slug: product.slug,
      short_description: product.short_description,
      price: product.price,
      original_price: product.original_price,
      discount_percent: product.discount_percent,
      featured: product.featured,
      in_stock: product.in_stock,
      category_name: product.categories?.name,
      collection_name: product.collections?.title,
      primary_image: product.product_images?.[0]?.image_url,
      available_sizes: [...new Set(product.product_variants?.map(v => v.size).filter(Boolean) || [])],
      available_colors: [...new Set(product.product_variants?.map(v => v.color).filter(Boolean) || [])]
    }))
  },

  // Get single product with full details
  async getProductById(id: string): Promise<ProductWithDetails | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (*),
        product_variants (*),
        categories (*),
        collections (*)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching product:', error)
      return null
    }

    return data
  },

  // Get product by slug
  async getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (*),
        product_variants (*),
        categories (*),
        collections (*)
      `)
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching product by slug:', error)
      return null
    }

    return data
  },

  // Get featured products
  async getFeaturedProducts(limit = 4): Promise<ProductListItem[]> {
    return this.getProducts({ featured: true, limit })
  },

  // Search products
  async searchProducts(query: string, limit = 20): Promise<ProductListItem[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        title,
        slug,
        short_description,
        price,
        original_price,
        discount_percent,
        featured,
        in_stock,
        categories (
          name
        ),
        collections (
          title
        ),
        product_images!inner (
          image_url,
          is_primary
        ),
        product_variants (
          size,
          color
        )
      `)
      .eq('product_images.is_primary', true)
      .or(`title.ilike.%${query}%, short_description.ilike.%${query}%, description.ilike.%${query}%`)
      .limit(limit)

    if (error) {
      console.error('Error searching products:', error)
      throw error
    }

    return (data || []).map(product => ({
      id: product.id,
      title: product.title,
      slug: product.slug,
      short_description: product.short_description,
      price: product.price,
      original_price: product.original_price,
      discount_percent: product.discount_percent,
      featured: product.featured,
      in_stock: product.in_stock,
      category_name: product.categories?.name,
      collection_name: product.collections?.title,
      primary_image: product.product_images?.[0]?.image_url,
      available_sizes: [...new Set(product.product_variants?.map(v => v.size).filter(Boolean) || [])],
      available_colors: [...new Set(product.product_variants?.map(v => v.color).filter(Boolean) || [])]
    }))
  },

  // Get products by category
  async getProductsByCategory(categorySlug: string, limit?: number): Promise<ProductListItem[]> {
    return this.getProducts({ category: categorySlug, limit })
  },

  // Get products by collection
  async getProductsByCollection(collectionSlug: string, limit?: number): Promise<ProductListItem[]> {
    return this.getProducts({ collection: collectionSlug, limit })
  }
}
