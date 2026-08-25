import type { Context } from "hono";
import { z } from "zod";

export type AppContext = Context<{ Bindings: Env }>;

export const GasPeriod = z.object({
  period: z.string(),
  value: z.number(),
  units: z.string(),
});
