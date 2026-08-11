import * as t from "io-ts";

import { PetroleumPeriod } from "../PetroleumPeriod";

const GraphData = t.readonly(
  t.type({
    frequency: t.string,
    periods: t.array(PetroleumPeriod),
  }),
);

type GraphDataT = t.TypeOf<typeof GraphData>;

export { GraphData, GraphDataT };
