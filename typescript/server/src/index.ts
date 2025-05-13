import { Elysia } from 'elysia'
import { router } from './routes'

const app = new Elysia()
  .use(router)
  .onRequest(({ set }) => {
    set.headers['Access-Control-Allow-Origin'] = 'http://localhost:3001'
    set.headers['Access-Control-Allow-Methods'] = 'GET'
    set.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    set.headers['Access-Control-Allow-Credentials'] = 'true'
  })
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
