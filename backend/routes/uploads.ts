import { Hono } from "hono"
import { cors } from 'hono/cors'




// Initialize Hono app
const app = new Hono()

// CORS middleware
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}))
