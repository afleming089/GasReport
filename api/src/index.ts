// follows best practice according to hono docs
// https://hono.dev/docs/guides/best-practices

import { Hono } from "hono";
import gasPeriods from "./controllers/gasPeriods";
import users from "./controllers/users";

const app = new Hono();

app.get("/", (c) => c.json("Hello"));
app.route("api/v1/users", users);
app.route("api/v1/gas-periods", gasPeriods);

export default app;
