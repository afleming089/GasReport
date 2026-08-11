import { ReadonlyC, TypeC } from "io-ts";

interface FetchConfig {
  // what front end model needs scheme validation
  model: TypeC<any> | ReadonlyC<any>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number>;
}

export { FetchConfig };
