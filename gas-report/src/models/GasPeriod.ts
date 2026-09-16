import * as t from "io-ts";

const GasPeriod = t.readonly(
  t.type({
    period: t.string,
    "area-name": t.string,
    "product-name": t.string,
    value: t.number,
    units: t.string,
  }),
);

type GasPeriodT = t.TypeOf<typeof GasPeriod>;

export { GasPeriod, GasPeriodT };
