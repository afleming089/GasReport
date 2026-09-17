/**
 * Models a part of an endpoint response. Not an entire endpoint
 *
 * @module
 */

import * as t from "io-ts";

const ComparedPetroPeriod = t.readonly(
  t.type({
    period: t.string,
    "area-name": t.string,
    "product-name": t.string,
    value: t.number,
    units: t.string,
  }),
);

type ComparedPetroPeriodT = t.TypeOf<typeof ComparedPetroPeriod>;

export { ComparedPetroPeriod, ComparedPetroPeriodT };
