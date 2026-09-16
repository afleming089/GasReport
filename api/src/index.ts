import { fromHono } from "chanfana";
import { Hono } from "hono";
import { every } from "hono/combine";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";

/// endpoints
import Auth from "./endpoints/auth/authEndpoints";
import PetroleumPeriods from "./endpoints/petroleumPeriod/petroleumEndpoints";

import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { timeout } from "hono/timeout";
import { rateLimiter } from "hono-rate-limiter";
import { logger } from "hono/logger";

type Env = {
  API_RATE_LIMITER: RateLimit;
};

const app = new Hono<{ Bindings: Env }>();

/** Global Error Management */
app.onError((err, c) => {
  console.error("Global error handler caught:", err);

  /**
   * Chanfana errors arrive as HTTPException with the formatted response attached.
   * Call getResponse() to return chanfana's standard error format.
   */
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  if (err instanceof ZodError) {
    return c.json(
      {
        ok: false,
        validationErrors: err.issues,
      },
      400,
    );
  }

  /** For non-chanfana errors, return a generic 500 response */
  return c.json(
    {
      success: false,
      errors: [{ code: 7000, message: "Internal Server Error" }],
    },
    500,
  );
});

/** Global Middleware  */
app.use(async (c, next) => {
  c.res.headers.set("Fetch-Time", `${new Date()}`);
  await next();
});

app.use(
  rateLimiter<{ Bindings: Env }>({
    binding: (c) => c.env.API_RATE_LIMITER,
    keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "",
    message: "Rate limit exceeded",
    statusCode: 429,
  }),
);

app.use(
  "/*",
  cors({
    //origin: ["https://gas-report.expo.app"],
    allowMethods: ["GET", "POST"],
  }),
);

app.use(
  "*",
  every(
    secureHeaders({
      xFrameOptions: false,
      xXssProtection: false,
    }),
    timeout(8000),
    //logger(),
  ),
);

/// Setup OpenAPI registry
const openapi = fromHono(app, {
  base: "/api/v1", /// Base path for all API routes
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

openapi.route("/auth", Auth);
openapi.route("/petroleum-periods", PetroleumPeriods);

export default app;
