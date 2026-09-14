import { z } from "zod";
import { ApiError } from "./ApiError";

const ApiResponse = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema.optional(),
    error: ApiError.optional(),
  });

type ApiResponseT<T extends z.ZodTypeAny> = z.infer<typeof ApiResponse<T>>;

export { ApiResponse, ApiResponseT };
