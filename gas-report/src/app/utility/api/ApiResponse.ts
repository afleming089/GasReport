import { ApiError } from "./ApiError";

interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export { ApiResponse };
