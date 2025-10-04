import { Hono } from "hono";
import z from "zod";
import { zValidator } from "@hono/zod-validator";


const ExpenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(1, "Title is required"),
    amount: z.number().positive("Amount must be positive"),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format YYYY-MM-DD",
    }),
})

type Expense = z.infer<typeof ExpenseSchema>

const expenseCreateSchema = ExpenseSchema.omit({ id: true})

const fakseExpenses: Expense[] = [
    {
        id: 1,
        title: "Groceries",
        amount: 150.75,
        date: "2023-10-01",
    },
    {
        id: 2,
        title: "Utilities",
        amount: 80.50,
        date: "2023-10-05",
    },
    {
        id: 3,
        title: "Supper",
        amount: 9022.00,
        date: "2023-10-02",
    }
]   

const expenseRoutes = new Hono()
    .get("/", async (c) => {
        await new Promise((r) => setTimeout(r, 2000))
        return c.json({ fakseExpenses })
    })
    .get("total-spent", async (c) => {
        // await new Promise((r) => setTimeout(r, 2000))
        const total = fakseExpenses.reduce((acc, expense) => acc + expense.amount, 0);
        return c.json({ total });
    })
    .post("/", zValidator("json", expenseCreateSchema), async (c) => {
        const data = await c.req.valid("json");

        fakseExpenses.push({ ...data, id: fakseExpenses.length + 1 })

        c.status(200)

        return c.json({ 
            message: "Expense created",
            expense: data,
        })
    })
    .get("/:id{[0-9]+}", async (c) => {

        const  id  = Number.parseInt(c.req.param("id"))
        const data = fakseExpenses.find((expense) => expense.id === id)
        if (!data) {
            return c.notFound()
        }

        return c.json({ data })

    })
    .put("/:id{[0-9]+}", zValidator("json", expenseCreateSchema), async (c) => {
        const id = Number.parseInt(c.req.param("id"))

        const expenseIndex = fakseExpenses.findIndex((expense) => expense.id === id );

        if (expenseIndex === -1) {
            return c.notFound()
        }

        return c.json({ message: "Expense Updated Sucessfully!", data: expenseIndex })

    })
    .delete("/:id{[0-9]+}", async (c) => {
        const id = Number.parseInt(c.req.param("id"))
        const data = fakseExpenses.find((expense) => expense.id === id)
        if (!data) {
            return c.notFound()
        }

        const index = fakseExpenses.indexOf(data)
        fakseExpenses.splice(index, 1)

        return c.json({ message: "Expense deleted" })
    })

export default expenseRoutes;