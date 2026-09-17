import * as t from "io-ts";

import { PetroleumPeriod } from "./components/PetroleumPeriod";

const GetPetroleumPeriods = t.readonly(
  t.type({
    frequency: t.string,
    PetroPeriods: t.array(PetroleumPeriod),
    total: t.number,
  }),
);

type GetPetroleumPeriodsT = t.TypeOf<typeof GetPetroleumPeriods>;

export { GetPetroleumPeriods, GetPetroleumPeriodsT };
