import * as t from "io-ts";
import * as td from "io-ts-types";

import { GraphData } from "./Graph";
import { OverallSummaryData } from "./OverallSummary";
import { PriceSnapshotData } from "./PriceSnapshot";

const DashboardData = t.readonly(
  t.type({
    fetchTime: td.date,
    areaName: t.string,
    productName: t.string,
    overallSummary: OverallSummaryData,
    graphData: GraphData,
    priceSnapShot: t.array(PriceSnapshotData),
  }),
);

type DashboardDataT = t.TypeOf<typeof DashboardData>;

export { DashboardData, DashboardDataT };
