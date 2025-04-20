import api from '@/helpers/api'
import { Category } from '@/types/category'
import { Product } from '@/types/product'

export async function getCategory(id: string): Promise<Category> {
  try {
    const { data } = await api.get(`/categories/${id}`)
    return data
  } catch (error) {
    console.error('Error fetching category:', error)
    throw error
  }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const { data } = await api.get(`/products/category/${categoryId}`)
    return data
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }
}
