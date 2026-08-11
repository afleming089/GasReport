import * as t from "io-ts";
import * as td from "io-ts-types";

import { GraphData } from "./Graph";
import { OverallSummary } from "./OverallSummary";
import { PriceSnapshot } from "./PriceSnapshot";

const DashboardData = t.readonly(
  t.type({
    fetchTime: td.date,
    areaName: t.string,
    productName: t.string,
    overallSummary: OverallSummary,
    graphData: GraphData,
    priceSnapShot: t.array(PriceSnapshot),
  }),
);

type DashboardDataT = t.TypeOf<typeof DashboardData>;

export { DashboardData, DashboardDataT };
