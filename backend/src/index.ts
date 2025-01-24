import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'



export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();
// app.use('/*', cors({ origin: 'http://localhost:5173' }))

app.use('/*', cors({
  origin: ['http://localhost:5173'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))


app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
// https://backend.matruki.workers.dev
//Bindings help you configure your app and pass sensitive or environment-specific data to the app (like database credentials).
//Variables help you manage and pass context-specific data during a request, such as the user making the request or the resource they are interacting with.
//Bindings are useful for configuration that should not change per request and should be kept secure, like connecting to a database, a secret key, or other external services.
//Variables are used for data that is dynamic and specific to the current request. For instance, once you authenticate a user with a JWT token, you might store the user ID as a variable to use throughout the request.