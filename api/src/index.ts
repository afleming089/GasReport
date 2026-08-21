// follows best practice according to hono docs
// https://hono.dev/docs/guides/best-practices

import { fromHono } from "chanfana";
import { Hono } from "hono";
import gasPeriods from "./controllers/gasPeriods";
import users from "./controllers/users";

const app = new Hono<{ Bindings: Env }>();
app.get("/", (c) => c.text("Welcome to GasReport API"));

// V1
const apiV1 = new Hono();
apiV1.get("/", (c) => c.text("Welcome to V1 of GasReport API"));
apiV1.route("/users", users);
apiV1.route("/gas-periods", gasPeriods);

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

openapi.route("/api/v1", apiV1);

export default app;

// import { fromHono } from "chanfana";
// import { Hono } from "hono";
// import { TaskCreate } from "./endpoints/taskCreate";
// import { TaskDelete } from "./endpoints/taskDelete";
// import { TaskFetch } from "./endpoints/taskFetch";
// import { TaskList } from "./endpoints/taskList";

// // Start a Hono app
// const app = new Hono<{ Bindings: Env }>();

// // Setup OpenAPI registry
// const openapi = fromHono(app, {
//   docs_url: "/",
// });

// // Register OpenAPI endpoints
// openapi.get("/api/tasks", TaskList);
// openapi.post("/api/tasks", TaskCreate);
// openapi.get("/api/tasks/:taskSlug", TaskFetch);
// openapi.delete("/api/tasks/:taskSlug", TaskDelete);

// // You may also register routes for non OpenAPI directly on Hono
// // app.get('/test', (c) => c.text('Hono!'))

// // Export the Hono app
// export default app;
