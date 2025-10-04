import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import expenseRoutes from "./routes/expenses";
import { serveStatic } from 'hono/bun'

const app = new Hono();

app.use("*", logger());

// CORS middleware
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}))

const apiRoutes = app.basePath("/api")
    .route("/expenses", expenseRoutes)

    
app.get("*", serveStatic({ root: '../frontend/dist'}))
app.get("*", serveStatic({ path: '../frontend/dist/index.html'}))

export default app;
export type ApiRoutes = typeof apiRoutes