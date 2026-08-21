// Endpoints for price periods overtime of consumer grade fuel
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json("list gas periods"));

export default app;
