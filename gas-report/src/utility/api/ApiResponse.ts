import * as t from "io-ts";
import { ApiError } from "./ApiError"; // Assuming ApiError is an io-ts codec

const ApiResponse = <T extends t.Mixed>(dataSchema: T) =>
  t.partial({
    data: dataSchema,
    error: ApiError,
  });

type ApiResponseT<T extends t.Mixed> = {
  data?: T;
  error?: t.TypeOf<typeof ApiError>;
};

export { ApiResponse, ApiResponseT };
