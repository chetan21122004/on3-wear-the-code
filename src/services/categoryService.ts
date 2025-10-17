import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type Category = Database['public']['Tables']['categories']['Row']

export interface CategoryWithProductCount extends Category {
  product_count: number
}

export const categoryService = {
  // Get all categories
  async getCategories(): Promise<CategoryWithProductCount[]> {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        products (count)
      `)
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      throw error
    }

    return (data || []).map(category => ({
      ...category,
      product_count: category.products?.[0]?.count || 0
    }))
  },

  // Get single category by ID
  async getCategoryById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching category:', error)
      return null
    }

    return data
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching category by slug:', error)
      return null
    }

    return data
  }
}
