import { success, z } from "zod";

/** Types */
/** Models http://api.eia.gov/v2/petroleum/pri/gnd/data endpoint responses */
export const EIAResponse = z.object({
  period: z.string(),
  duoarea: z.string(),
  "area-name": z.string(),
  product: z.string(),
  "product-name": z.string(),
  process: z.string(),
  "process-name": z.string(),
  series: z.string(),
  "series-description": z.string(),
  value: z.coerce.number(), // Automatically converts string to number
  units: z.string(),
});

export type EIAGasPeriodT = z.infer<typeof EIAResponse>;

/** What is returned to the user */
export const GasPeriod = EIAResponse.pick({
  period: true,
  "area-name": true,
  "product-name": true,
  value: true,
  units: true,
});

export type GasPeriodT = z.infer<typeof GasPeriod>;

/**
 *  period: date
 *
 *  value: price at this period
 *
 *  units: string of measurement type
 *
 *  percentChange: percent change from prior period to reference period
 *
 *  priceChange: price change from prior period to reference period
 */
export const ComparedGasPeriod = GasPeriod.extend({
  timeAgo: z.string(),
  percentChange: z.coerce.number(), // percent change from prior period to reference period
  priceChange: z.coerce.number(), // price change from prior period to reference period
});

export type ComparedGasPeriodT = z.infer<typeof ComparedGasPeriod>;

/**
 * Incases there is a non existent value in the data set. Like the user request all the way at the end of the data set.
 */
export const NullPeriod = z.object({
  success: z.boolean(),
  message: z
    .string()
    .regex(
      /^Period \d+ (?:weeks|months|years) before \d{4}-\d{2}-\d{2}$|^\d{4}-\d{2}$|^\d{4} dose not exist\.$/,
      "Example output: Period 3 weeks before 2026-01-04 dose not exist.",
    )
    .describe(
      "A formatted error for if a period dose not exist in a data set. Example Period [int 1 or more] [string with value of 'weeks', 'months' or 'years'] before [referencePeriod] dose not exist.",
    ),
});

export type NullPeriodT = z.infer<typeof NullPeriod>;

/** Regular Expression */
/** for YYYY or YYYY-MM or YYYY-MM-DD formats */
export const Year_Month_Day = /^\d{4}-\d{2}-\d{2}$|^\d{4}-\d{2}$|^\d{4}$/;

/** for YYYY or YYYY-MM formats */
export const Year_Month = /^\d{4}-\d{2}-\d{2}$|^\d{4}-\d{2}$|^\d{4}$/;

/** options */
export const frequency = ["weekly", "monthly", "annual"] as const;

/** Query Parameter Options */
/**
 * docs https://www.eia.gov/petroleum/gasdiesel/gas_geographies.php#pricesbyregion
 * PADD means Petroleum Administration for Defense Districts
 *
 *  NUS: U.S. [All Below]
 *
 *  R10: PADD 1 East Coast [New England, Central Atlantic, Lower Atlantic]
 *
 *  R1X: PADD 1A New England [ME, VT, NH, MA, CT, RI]
 *
 *  R1Y: PADD 1B Central Atlantic [NY, PA, MD, NJ, DE]
 *
 *  R1Z: PADD 1C Lower Atlantic [WV, VA, NC, SC, GA, FL]
 *
 *  R20: PADD 2 Midwest [ND, SD, NE, KS, OK, MO, IA, MN, WI, IL, IN, MI, OH, KY, TN]
 *
 *  R30: PADD 3 Gulf Coast [NM, TX, AR, LA, MS, AL]
 *
 *  R40: PADD 4 Rocky Mountain [MT, ID, WY, UT, CO]
 *
 *  R50: PADD 5 West Coast [WA, OR, NV, CA, AZ, AK, HI]
 *
 *  R5XCA: PADD 5 EXCEPT CALIFORNIA
 *
 *  SCA: CALIFORNIA
 *
 *  SCO: COLORADO
 *
 *  SFL: FLORIDA
 *
 *  SMA: MASSACHUSETTS
 *
 *  SMN: MINNESOTA
 *
 *  SNY: NEW YORK
 *
 *  SOH: OHIO
 *
 *  STX: TEXAS
 *
 *  SWA: WASHINGTON
 *
 *  Y05LA: LOS ANGELES
 *
 *  Y05SF: SAN FRANCISCO
 *
 *  Y35NY: NEW YORK CITY
 *
 *  Y44HO: HOUSTON
 *
 *  Y48SE: SEATTLE
 *
 *  YBOS: BOSTON
 *
 *  YCLE: CLEVELAND
 *
 *  YDEN: DENVER
 *
 *  YMIA: MIAMI
 *
 *  YORD: CHICAGO
 */
export const locations = [
  "NUS", // U.S. [All Below]
  "R10", // PADD 1 East Coast [New England, Central Atlantic, Lower Atlantic]
  "R1X", // PADD 1A New England [ME, VT, NH, MA, CT, RI]
  "R1Y", // PADD 1B Central Atlantic [NY, PA, MD, NJ, DE]
  "R1Z", // PADD 1C Lower Atlantic [WV, VA, NC, SC, GA, FL]
  "R20", // PADD 2 Midwest [ND, SD, NE, KS, OK, MO, IA, MN, WI, IL, IN, MI, OH, KY, TN]
  "R30", // PADD 3 Gulf Coast [NM, TX, AR, LA, MS, AL]
  "R40", // PADD 4 Rocky Mountain [MT, ID, WY, UT, CO]
  "R50", // PADD 5 West Coast [WA, OR, NV, CA, AZ, AK, HI]
  "R5XCA", // PADD 5 EXCEPT CALIFORNIA
  "SCA", // CALIFORNIA
  "SCO", // COLORADO
  "SFL", // FLORIDA
  "SMA", // MASSACHUSETTS
  "SMN", // MINNESOTA
  "SNY", // NEW YORK
  "SOH", // OHIO
  "STX", // TEXAS
  "SWA", // WASHINGTON
  "Y05LA", // LOS ANGELES
  "Y05SF", // SAN FRANCISCO
  "Y35NY", // NEW YORK CITY
  "Y44HO", // HOUSTON
  "Y48SE", // SEATTLE
  "YBOS", // BOSTON
  "YCLE", // CLEVELAND
  "YDEN", // DENVER
  "YMIA", // MIAMI
  "YORD", // CHICAGO
] as const;

/** includes subsets in each such as low sulfur, reformulated and conventional
 * EPMR: Regular Gasoline
 *
 * EPMM: Mid-grade
 *
 * EPMP: Premium Gasoline
 *
 * EPD2D: No 2 Diesel
 *
 * EPM0: Total Gasoline
 */
export const fuelType = [
  "EPMR", // Regular Gasoline
  "EPMM", // Mid-grade
  "EPMP", // Premium Gasoline
  "EPD2D", // No 2 Diesel
  "EPM0", // Total Gasoline
] as const;
