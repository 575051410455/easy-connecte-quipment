import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serveStatic } from 'hono/bun'
import { authRoutes } from "./routes/auth";
import { usersRoutes } from "./routes/users";


const app = new Hono();

app.use("*", logger());


// CORS middleware
app.use('*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}))

const apiRoutes = app.basePath("/api")
    .route("/auth", authRoutes)
    .route("/users", usersRoutes);

// Health check
app.get("/", (c) => {
  return c.json({ message: "API is running" });
});

// 404
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});


app.get("*", serveStatic({ root: '../frontend/dist'}))
app.get("*", serveStatic({ path: '../frontend/dist/index.html'}))

export default app;
export type ApiRoutes = typeof apiRoutes