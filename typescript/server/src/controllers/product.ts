import { create, getAll, getByCategoryId, getById, remove, update } from '../database'
import { Product } from '../types/product'

export const productController = {
  async get(id: number): Promise<Product> {
    const product = await getById('products', id)
    if (!product) throw new Error(`Product with id ${id} not found`)
    return product
  },

  async getAll(): Promise<Product[]> {
    const products = await getAll('products')
    return products
  },

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const newProduct = await create('products', product)
    return newProduct
  },

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const updatedProduct = await update('products', id, product)
    return updatedProduct
  },

  async delete(id: number): Promise<Product> {
    const deletedProduct = await remove('products', id)
    return deletedProduct
  },

  async getByCategory(categoryId: number): Promise<Product[]> {
    const products = await getByCategoryId('products', categoryId)
    return products
  },
}
