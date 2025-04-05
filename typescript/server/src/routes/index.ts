import { Elysia } from 'elysia'
import { categoryRoutes } from './categories'
import { productRoutes } from './products'

export const router = new Elysia().use(categoryRoutes).use(productRoutes)
