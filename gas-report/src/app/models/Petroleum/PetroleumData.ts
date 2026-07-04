import { PetroleumPeriod } from "./PetroleumPeriod";

interface PetroleumData {
  readonly fetchTime: Date;
  readonly areaName: string;
  readonly productName: string;
  readonly frequency: string;
  readonly periods: PetroleumPeriod[];
}

export { PetroleumData };
