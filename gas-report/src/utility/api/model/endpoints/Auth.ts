import * as t from "io-ts";

const Auth = t.readonly(
  t.type({
    sessionToken: t.string,
  }),
);

type AuthT = t.TypeOf<typeof Auth>;

export { Auth, AuthT };
