import { products } from '../db'
import { Product } from '../types/product'

export const productController = {
  get(id: number): Product {
    const product = products.find((product) => product.id === id)
    if (!product) throw new Error(`Product with id ${id} not found`)
    return product
  },

  getAll(): Product[] {
    return [...products]
  },

  create(product: Omit<Product, 'id'>): Product {
    const id = products.length + 1
    const newProduct = {
      ...product,
      id: id,
    }
    products.push({ ...newProduct })
    return { ...newProduct }
  },

  update(id: number, product: Partial<Product>): Product {
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`)
    }

    const updatedProduct = {
      ...products[index],
      ...product,
      id,
    }

    products[index] = updatedProduct
    return { ...updatedProduct }
  },

  delete(id: number): Product {
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`)
    }

    return products.splice(index, 1)[0]
  },
}
