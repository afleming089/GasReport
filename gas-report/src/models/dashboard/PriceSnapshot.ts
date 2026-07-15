import { PetroleumPeriod } from "../PetroleumPeriod";

// can get a PetroleumPeriod and add a name like this week or last week to it.
// example compare price from this week to a week ago, a month ago etc.
interface PriceSnapshot {
  petroleumPeriod: PetroleumPeriod;
  snapShotTitle: string;
}

export { PriceSnapshot };
