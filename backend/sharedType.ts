import z from "zod"


const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
})

const uploadSignatureSchema = z.object({
  userId: z.string().transform(Number),
})

