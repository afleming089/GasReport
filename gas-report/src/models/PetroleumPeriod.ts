import * as t from "io-ts";
import * as td from "io-ts-types";

const PetroleumPeriod = t.type({
  period: td.DateFromUnixTime,
  value: t.number,
  units: t.string,
});

type PetroleumPeriodT = t.TypeOf<typeof PetroleumPeriod>;

export { PetroleumPeriod, PetroleumPeriodT };
