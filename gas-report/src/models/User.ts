import * as t from "io-ts";

const User = t.readonly(
  t.type({
    email: t.string,
    settings: t.readonly(
      t.type({ defaultRegion: t.string, defaultFuelType: t.string }),
    ),
    sessionToken: t.string,
  }),
);

type UserT = t.TypeOf<typeof User>;

export { User, UserT };
