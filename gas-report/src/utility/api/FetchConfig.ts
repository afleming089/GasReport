import { z } from "zod";

interface FetchConfig {
  // what front end model needs scheme validation
  model: z.ZodType<any>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number>;
  body?: string;
}

export { FetchConfig };
