import { Elysia } from 'elysia'
import { productController } from '../controllers/product'
import { Product } from '../types/product'

export const productRoutes = new Elysia({ prefix: '/products' })
  .get('/', () => productController.getAll())
  .get('/category/:categoryId', ({ params: { categoryId } }) =>
    productController.getByCategory(Number(categoryId))
  )
  .get('/:id', ({ params: { id } }) => productController.get(Number(id)))
  .post('/', ({ body }) => productController.create(body as Omit<Product, 'id'>))
  .put('/:id', ({ params: { id }, body }) => productController.update(Number(id), body as Partial<Product>))
  .delete('/:id', ({ params: { id } }) => productController.delete(Number(id)))
