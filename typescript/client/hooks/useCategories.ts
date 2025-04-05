import { apiUrl } from '@/helpers/consts'
import { Category } from '@/types/category'

export async function useCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${apiUrl}/categories`)
    const categories = (await response.json()) as Category[]
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
