import { Category } from '../types/category'
import { Product } from '../types/product'

export const categories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    icon: 'LaptopIcon',
  },
  {
    id: 2,
    name: 'Books',
    icon: 'ReaderIcon',
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    icon: 'HomeIcon',
  },
  {
    id: 4,
    name: 'Sports',
    icon: 'PersonIcon',
  },
]

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality bluetooth headphones with noise cancellation',
    quantity: 15,
    price: 199.99,
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor',
    quantity: 20,
    price: 299.99,
    categoryId: 1,
  },
  {
    id: 3,
    name: 'The Art of Programming',
    description: 'Comprehensive guide to modern programming practices',
    quantity: 50,
    price: 49.99,
    categoryId: 2,
  },
  {
    id: 4,
    name: 'Science Fiction Anthology',
    description: 'Collection of best sci-fi short stories',
    quantity: 30,
    price: 29.99,
    categoryId: 2,
  },
  {
    id: 5,
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with 12-cup capacity',
    quantity: 10,
    price: 79.99,
    categoryId: 3,
  },
  {
    id: 6,
    name: 'Air Fryer',
    description: 'Digital air fryer with multiple cooking presets',
    quantity: 25,
    price: 129.99,
    categoryId: 3,
  },
  {
    id: 7,
    name: 'Yoga Mat',
    description: 'Non-slip exercise yoga mat with carrying strap',
    quantity: 40,
    price: 24.99,
    categoryId: 4,
  },
  {
    id: 8,
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set with stand',
    quantity: 8,
    price: 149.99,
    categoryId: 4,
  },
]
