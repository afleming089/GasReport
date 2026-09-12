/// Endpoints for price periods overtime of consumer grade fuel
import { Hono, type Context } from "hono";
import { fromHono } from "chanfana";

/// services
import { CreateClientToken } from "./tasks/createClientToken";
import { ValidateToken } from "./tasks/validateToken";

export type Env = {
  // Example bindings, use your own
  DB: D1Database;
  BUCKET: R2Bucket;
};
export type AppContext = Context<{ Bindings: Env }>;

const app = fromHono(new Hono<{ Bindings: Env }>());
const openapi = fromHono(app);

openapi.post("/", ValidateToken);
openapi.post("/create", CreateClientToken);

export default app;
