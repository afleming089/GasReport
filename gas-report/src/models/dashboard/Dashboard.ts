import { GraphData } from "./Graph";
import { OverallSummary } from "./OverallSummary";
import { PriceSnapshot } from "./PriceSnapshot";

interface DashboardData {
  readonly fetchTime: Date;
  readonly areaName: string;
  readonly productName: string;
  readonly overallSummary: OverallSummary;
  readonly graphData: GraphData;
  readonly priceSnapShot: PriceSnapshot[];
}

export { DashboardData };
