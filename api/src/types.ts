/**
 * Used to grab app context/state
 * @module */

import type { Context } from "hono";

export type AppContext = Context<{ Bindings: Env }>;
