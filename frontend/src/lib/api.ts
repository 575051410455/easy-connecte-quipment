
import { hc } from 'hono/client'
import { type ApiRoutes } from "@/backend/app"
import { type insertUser } from "@/backend/sharedType"

const client = hc<ApiRoutes>('/')

export const api = client.api

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

async function getCurrentUser() {
    const res = await api.users.me.$get()
    if (!res.ok) {
        throw new Error("Failed to fetch user")
    }
    const data = await res.json()
    return data;
}

export const userQueryOptions = {
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: Infinity,
}


export async function getAllUsers() {
    const res = await api.users.$get();
    if (!res.ok) {
        throw new Error("server error");
    }

    const data = await res.json();
    return data;
}

