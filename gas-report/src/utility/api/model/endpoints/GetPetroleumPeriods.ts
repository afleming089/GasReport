import { z } from "zod";

import { GasPeriod } from "./types/petroleumTypes";

const GetPetroleumPeriods = z.object({
  frequency: z.string(),
  PetroPeriods: z.array(GasPeriod),
  total: z.number(),
});

type GetPetroleumPeriodsT = z.infer<typeof GetPetroleumPeriods>;

export { GetPetroleumPeriods, GetPetroleumPeriodsT };
