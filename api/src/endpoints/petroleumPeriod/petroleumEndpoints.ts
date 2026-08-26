// Endpoints for price periods overtime of consumer grade fuel
import { Hono, type Context } from "hono";
import { fromHono } from "chanfana";

// services
import { GetPetroleumPeriods } from "./tasks/getPetroleumPeriods";
import { ComparePeriodChanges } from "./tasks/comparePeriodChange";

export type Env = {
  // Example bindings, use your own
  DB: D1Database;
  BUCKET: R2Bucket;
};
export type AppContext = Context<{ Bindings: Env }>;

const app = fromHono(new Hono<{ Bindings: Env }>());
const openapi = fromHono(app);

openapi.get("/", GetPetroleumPeriods);
openapi.get("/compare", ComparePeriodChanges);

export default app;
