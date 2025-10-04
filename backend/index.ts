import app from "./app";
import z from "zod";


const ServerEnv = z.object({
    PORT:     z.string()
    .regex(/^\d+$/, "Port must be a numeric string")
    .default("3000")
    .transform(Number),
});

const ProcessEnv = ServerEnv.parse(process.env);

Bun.serve({
    port: ProcessEnv.PORT,
    hostname: "0.0.0.0",
    fetch: app.fetch,
})


console.log(`Server running on http://localhost:${ProcessEnv.PORT}`);