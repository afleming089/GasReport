import * as t from "io-ts";

import { PetroleumPeriod } from "./components/PetroleumPeriod";

const ComparePetroleumPeriods = t.readonly(
  t.type({
    referencePeriod: PetroleumPeriod,
    comparedGasPeriods: t.array(PetroleumPeriod),
  }),
);

type ComparePetroleumPeriodsT = t.TypeOf<typeof ComparePetroleumPeriods>;

export { ComparePetroleumPeriods, ComparePetroleumPeriodsT };
