import * as t from "io-ts";

const OverallSummaryData = t.readonly(
  t.type({
    periodAverage: t.number,
    weeklyChange: t.string,
    monthlyChange: t.string,
  }),
);

type OverallSummaryDataT = t.TypeOf<typeof OverallSummaryData>;

export { OverallSummaryData, OverallSummaryDataT };
