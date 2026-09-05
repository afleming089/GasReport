import { fromHono } from "chanfana";
import { Hono } from "hono";

/// endpoints
// import Users from "./endpoints/"
import PetroleumPeriods from "./endpoints/petroleumPeriod/petroleumEndpoints";
import { UnauthorizedException } from "chanfana";
import { TooManyRequestsException } from "chanfana";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

const app = new Hono<{ Bindings: Env }>();

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

  //   if (!authToken) {
  //     throw new UnauthorizedException("Authentication token is required.");
  //   }

  // In your endpoint
  // if (rateLimitExceeded) {
  //   throw new TooManyRequestsException("Rate limit exceeded", 60); // Retry after 60 seconds
  // }
  // Response will include header: Retry-After: 60

  /** For non-chanfana errors, return a generic 500 response */
  return c.json(
    {
      success: false,
      errors: [{ code: 7000, message: "Internal Server Error" }],
    },
    500,
  );
});

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

// openapi.route("/users", users);
openapi.route("/petroleum-periods", PetroleumPeriods);

export default app;
