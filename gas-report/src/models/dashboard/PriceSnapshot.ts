import * as t from "io-ts";

import { PetroleumPeriod } from "../PetroleumPeriod";

// can get a PetroleumPeriod and add a name like this week or last week to it.
// example compare price from this week to a week ago, a month ago etc.
const PriceSnapshotData = t.readonly(
  t.type({
    petroleumPeriod: PetroleumPeriod,
    snapShotTitle: t.string,
  }),
);

type PriceSnapshotDataT = t.TypeOf<typeof PriceSnapshotData>;

export { PriceSnapshotData, PriceSnapshotDataT };
