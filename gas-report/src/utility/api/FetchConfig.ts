interface FetchConfig {
  type?: Exclude<any, undefined>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number>;
}

export { FetchConfig };
