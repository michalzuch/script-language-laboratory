import { Category } from '@/types/category'
import { Product } from '@/types/product'
import { apiUrl } from './consts'

export async function getCategory(id: string): Promise<Category> {
  const res = await fetch(`${apiUrl}/categories/${id}`)
  if (!res.ok) throw new Error('Failed to fetch category')
  return res.json()
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const res = await fetch(`${apiUrl}/products/category/${categoryId}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}
