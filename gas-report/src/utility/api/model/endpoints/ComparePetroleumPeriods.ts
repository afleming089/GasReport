import { z } from "zod";

import {
  GasPeriod,
  ComparedGasPeriod,
  NullPeriod,
} from "./types/petroleumTypes";

const ComparePetroleumPeriods = z.object({
  referencePeriod: GasPeriod,
  comparedGasPeriods: z.array(ComparedGasPeriod.or(NullPeriod)),
});

type ComparePetroleumPeriodsT = z.infer<typeof ComparePetroleumPeriods>;

export { ComparePetroleumPeriods, ComparePetroleumPeriodsT };
