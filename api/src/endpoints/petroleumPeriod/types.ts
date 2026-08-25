import type { Context } from "hono";
import { z } from "zod";

export type AppContext = Context<{ Bindings: Env }>;

export const GasPeriod = z.object({
  period: z.string(),
  value: z.number(),
  units: z.string(),
});

// add api formats and have it be one of these but can be any of them.
export const DateFormat = z.object({
  year: z.string().regex(""); // 4 numbers
  month
})