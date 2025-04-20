import { createClient } from '@supabase/supabase-js'
import { Category } from '../types/category'
import { Product } from '../types/product'

const supabaseUrl = 'localhost:54321'
const supabaseKey = process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export const getById = async (table: string, id: number) => {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).single()

  if (error) throw error
  return data
}

export const getAll = async (table: string) => {
  const { data, error } = await supabase.from(table).select('*')

  if (error) throw error
  return data
}

export const create = async <T extends object>(table: string, item: T) => {
  const { data, error } = await supabase.from(table).insert(item).select().single()

  if (error) throw error
  return data
}

export const update = async <T extends object>(table: string, id: number, updates: Partial<T>) => {
  const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single()

  if (error) throw error
  return data
}

export const remove = async (table: string, id: number) => {
  const { data, error } = await supabase.from(table).delete().eq('id', id).select().single()

  if (error) throw error
  return data
}

export const getByCategoryId = async (table: string, categoryId: number) => {
  const { data, error } = await supabase.from(table).select('*').eq('category_id', categoryId)

  if (error) throw error
  return data
}

export const categories = {
  getById: (id: number) => getById('categories', id) as Promise<Category>,
  getAll: () => getAll('categories') as Promise<Category[]>,
  create: (category: Omit<Category, 'id'>) => create('categories', category) as Promise<Category>,
  update: (id: number, updates: Partial<Category>) => update('categories', id, updates) as Promise<Category>,
  delete: (id: number) => remove('categories', id) as Promise<Category>,
}

export const products = {
  getById: (id: number) => getById('products', id) as Promise<Product>,
  getAll: () => getAll('products') as Promise<Product[]>,
  getByCategoryId: (categoryId: number) => getByCategoryId('products', categoryId) as Promise<Product[]>,
  create: (product: Omit<Product, 'id'>) => create('products', product) as Promise<Product>,
  update: (id: number, updates: Partial<Product>) => update('products', id, updates) as Promise<Product>,
  delete: (id: number) => remove('products', id) as Promise<Product>,
}
