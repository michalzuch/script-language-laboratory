import { create, getAll, getById, remove, update } from '../database'
import { Category } from '../types/category'

export const categoryController = {
  async get(id: number): Promise<Category> {
    try {
      const category = await getById('categories', id)
      return category
    } catch (error) {
      throw new Error(`Category with id ${id} not found: ${error}`)
    }
  },

  async getAll(): Promise<Category[]> {
    try {
      const categories = await getAll('categories')
      return categories
    } catch (error) {
      throw new Error(`Error getting all categories: ${error}`)
    }
  },

  async create(category: Omit<Category, 'id'>): Promise<Category> {
    const newCategory = await create('categories', category)
    return newCategory
  },

  async update(id: number, category: Partial<Category>): Promise<Category> {
    const updatedCategory = await update('categories', id, category)
    return updatedCategory
  },

  async delete(id: number): Promise<Category> {
    const deletedCategory = await remove('categories', id)
    return deletedCategory
  },
}
