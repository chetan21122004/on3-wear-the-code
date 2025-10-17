import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type Collection = Database['public']['Tables']['collections']['Row']

export interface CollectionWithProductCount extends Collection {
  product_count: number
}

export const collectionService = {
  // Get all collections
  async getCollections(): Promise<CollectionWithProductCount[]> {
    const { data, error } = await supabase
      .from('collections')
      .select(`
        *,
        products (count)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching collections:', error)
      throw error
    }

    return (data || []).map(collection => ({
      ...collection,
      product_count: collection.products?.[0]?.count || 0
    }))
  },

  // Get single collection by ID
  async getCollectionById(id: string): Promise<Collection | null> {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching collection:', error)
      return null
    }

    return data
  },

  // Get collection by slug
  async getCollectionBySlug(slug: string): Promise<Collection | null> {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching collection by slug:', error)
      return null
    }

    return data
  },

  // Get featured collections (you can add a featured field to collections table if needed)
  async getFeaturedCollections(limit = 3): Promise<CollectionWithProductCount[]> {
    const collections = await this.getCollections()
    return collections.slice(0, limit)
  }
}
