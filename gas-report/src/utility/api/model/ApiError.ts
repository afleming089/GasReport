import * as t from "io-ts";

const ApiError = t.intersection([
  t.type({
    message: t.string,
  }),
  t.partial({
    status: t.number,
  }),
]);

type ApiErrorT = t.TypeOf<typeof ApiError>;

export { ApiError, ApiErrorT };
