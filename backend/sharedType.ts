import { insertUserSchema, selectUserSchema } from "./db/schema";
import { z } from "zod"


export const createUserSchema = insertUserSchema.omit({
    userId: true,
    createdAt: true,
    id: true,
});

// Type inference
export type insertUser = z.infer<typeof createUserSchema>;
export type selectUser = z.infer<typeof selectUserSchema>;