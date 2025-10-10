import { numeric, text, pgTable, uuid, index, timestamp, date, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";




export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: roleEnum("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
// ไม่ต้องสร้าง index บน primary key

export const sessions = pgTable(
  "sessions", 
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (sessions) => {
    return {
      userIdIndex: index("sessions_user_id_idx").on(sessions.userId), // ✅ Index ที่มีประโยชน์
    };
  }
);





// Schema for inserting user - can be user to validate API requests
export const insertUserSchema = createInsertSchema(users, {
    name: z
        .string()
        .min(3, {
            message: "Name must be at least 3 characters"
        }),
    email: z
        .string()
        .email({ message: "Must be a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    role: z
        .enum(["user", "admin"]).optional(), // optional เพราะมี default
});


// Schema for selecting a user - can be used to validate API response
export const selectUserSchema = createInsertSchema(users);


