import * as t from "io-ts";

const OverallSummary = t.readonly(
  t.type({
    periodAverage: t.number,
    weeklyChange: t.string,
    monthlyChange: t.string,
  }),
);

type OverallSummaryT = t.TypeOf<typeof OverallSummary>;

export { OverallSummary, OverallSummaryT };
