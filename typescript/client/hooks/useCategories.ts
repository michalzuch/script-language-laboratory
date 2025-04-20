import api from '@/helpers/api'
import { Category } from '@/types/category'

export async function useCategories(): Promise<Category[]> {
  try {
    const { data } = await api.get('/categories')
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
