import * as t from "io-ts";

import { GasPeriod } from "./GasPeriod";

const ComparePeriods = t.readonly(
  t.type({
    frequency: t.number,
    GasPeriods: t.array(GasPeriod),
    total: t.number,
  }),
);

type ComparePeriodsT = t.TypeOf<typeof ComparePeriods>;

export { ComparePeriods, ComparePeriodsT };
