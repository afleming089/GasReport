// follows best practice according to hono docs
// https://hono.dev/docs/guides/best-practices

import { fromHono } from "chanfana";
import { Hono } from "hono";

// endpoints
// import Users from "./endpoints/"
import PetroleumPeriods from "./endpoints/petroleumPeriod/petroleumEndpoints";

const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  base: "/api/v1", // Base path for all API routes
  schema: {
    info: {
      title: "GasReport",
      version: "2.0.0",
      description:
        "Backend for GasReport application. Can retrieve data on Gas prices across the US.",
    },
    servers: [
      {
        url: "https://api.example.com/api/v1",
        description: "Production server",
      },
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
    ],
    tags: [
      { name: "users", description: "Operations related to users" },
      { name: "products", description: "Operations related to products" },
    ],
  },
  docs_url: "/docs",
  openapi_url: "/openapi.json",
  openapiVersion: "3.1", // or '3' for OpenAPI v3.0.3
  generateOperationIds: true,
  raiseUnknownParameters: false,
});

// openapi.route("/users", users);
openapi.route("/petroleum-periods", PetroleumPeriods);

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
