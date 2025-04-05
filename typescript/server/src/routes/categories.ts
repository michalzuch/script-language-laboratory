import { Elysia } from 'elysia'
import { categoryController } from '../controllers/category'
import { Category } from '../types/category'

export const categoryRoutes = new Elysia({ prefix: '/categories' })
  .get('/', () => categoryController.getAll())
  .get('/:id', ({ params: { id } }) => categoryController.get(Number(id)))
  .post('/', ({ body }) => categoryController.create(body as Omit<Category, 'id'>))
  .put('/:id', ({ params: { id }, body }) => categoryController.update(Number(id), body as Partial<Category>))
  .delete('/:id', ({ params: { id } }) => categoryController.delete(Number(id)))
