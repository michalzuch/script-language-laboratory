import { categories } from '../db'
import { Category } from '../types/category'

export const categoryController = {
  get(id: number): Category {
    const category = categories.find((category) => category.id === id)
    if (!category) throw new Error(`Category with id ${id} not found`)
    return category
  },

  getAll(): Category[] {
    return [...categories]
  },

  create(category: Omit<Category, 'id'>): Category {
    const id = categories.length + 1
    const newCategory = {
      ...category,
      id: id,
    }
    categories.push({ ...newCategory })
    return { ...newCategory }
  },

  update(id: number, category: Partial<Category>): Category {
    const index = categories.findIndex((c) => c.id === id)
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`)
    }

    const updatedCategory = {
      ...categories[index],
      ...category,
      id,
    }

    categories[index] = updatedCategory
    return { ...updatedCategory }
  },

  delete(id: number): Category {
    const index = categories.findIndex((category) => category.id === id)
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`)
    }

    return categories.splice(index, 1)[0]
  },
}
