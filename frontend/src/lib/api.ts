
import { hc } from 'hono/client'
import type { ApiRoutes } from "@/backend/app"


export const api = hc<ApiRoutes>('http://localhost:3000')