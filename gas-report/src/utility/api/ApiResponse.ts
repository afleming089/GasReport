import { ApiError } from "./ApiError";

interface ApiResponse {
  data?: any;
  error?: ApiError;
}

export { ApiResponse };
