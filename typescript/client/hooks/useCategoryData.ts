import { getCategory, getProductsByCategory } from '@/helpers/dataFetching'
import { Category } from '@/types/category'
import { Product } from '@/types/product'

export async function useCategoryData(categoryId: string): Promise<[Category, Product[]]> {
  try {
    const [category, products] = await Promise.all([
      getCategory(categoryId),
      getProductsByCategory(categoryId),
    ])
    return [category, products]
  } catch (error) {
    console.error('Error fetching category data:', error)
    throw error
  }
}
