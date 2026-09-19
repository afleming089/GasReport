import { z } from "zod";
import { ApiError, ApiErrorT } from "./ApiError"; // Assuming ApiError is an io-ts codec

const ApiResponse = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema.optional(),
    error: ApiError.optional(),
  });

type ApiResponseT<T> = {
  data?: T;
  error?: ApiErrorT;
};

export { ApiResponse, ApiResponseT };
