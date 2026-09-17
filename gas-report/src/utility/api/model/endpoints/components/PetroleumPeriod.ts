/**
 * Models a part of an endpoint response. Not an entire endpoint
 *
 * @module
 */

import * as t from "io-ts";

const PetroleumPeriod = t.readonly(
  t.type({
    period: t.string,
    "area-name": t.string,
    "product-name": t.string,
    value: t.number,
    units: t.string,
  }),
);

type PetroleumPeriodT = t.TypeOf<typeof PetroleumPeriod>;

export { PetroleumPeriod, PetroleumPeriodT };
