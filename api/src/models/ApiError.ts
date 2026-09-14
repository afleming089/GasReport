import { z } from "zod";

const ApiError = z.object({
  message: z.string(),
  status: z.number().optional(),
});

type ApiErrorT = z.infer<typeof ApiError>;

export { ApiError, ApiErrorT };
