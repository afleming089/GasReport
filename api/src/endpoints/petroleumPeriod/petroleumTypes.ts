import { z } from "zod";

export const GasPeriod = z.object({
  period: z.string(),
  areaName: z.string(),
  productName: z.string(),
  value: z.number(),
  units: z.string(),
});

export type GasPeriodT = z.infer<typeof GasPeriod>;

// // add api formats and have it be one of these but can be any of them.
// export const DateFormat = z.object({
//   year: z.string().regex(""); // 4 numbers
//   month
// })

/// options
export const frequency = ["weekly", "monthly", "annual"] as const;

/// docs https://www.eia.gov/petroleum/gasdiesel/gas_geographies.php#pricesbyregion
/// PADD means Petroleum Administration for Defense Districts
export const locations = [
  "NUS", /// U.S. [All Below]
  "R10", /// PADD 1 East Coast [New England, Central Atlantic, Lower Atlantic]
  "R1X", /// PADD 1A New England [ME, VT, NH, MA, CT, RI]
  "R1Y", /// PADD 1B Central Atlantic [NY, PA, MD, NJ, DE]
  "R1Z", /// PADD 1C Lower Atlantic [WV, VA, NC, SC, GA, FL]
  "R20", /// PADD 2 Midwest [ND, SD, NE, KS, OK, MO, IA, MN, WI, IL, IN, MI, OH, KY, TN]
  "R30", /// PADD 3 Gulf Coast [NM, TX, AR, LA, MS, AL]
  "R40", /// PADD 4 Rocky Mountain [MT, ID, WY, UT, CO]
  "R50", /// PADD 5 West Coast [WA, OR, NV, CA, AZ, AK, HI]
  "R5XCA", /// PADD 5 EXCEPT CALIFORNIA
  "SCA", /// CALIFORNIA
  "SCO", /// COLORADO
  "SFL", /// FLORIDA
  "SMA", /// MASSACHUSETTS
  "SMN", /// MINNESOTA
  "SNY", /// NEW YORK
  "SOH", /// OHIO
  "STX", /// TEXAS
  "SWA", /// WASHINGTON
  "Y05LA", ///  LOS ANGELES
  "Y05SF", ///  SAN FRANCISCO
  "Y35NY", ///  NEW YORK CITY
  "Y44HO", ///  HOUSTON
  "Y48SE", ///  SEATTLE
  "YBOS", /// BOSTON
  "YCLE", /// CLEVELAND
  "YDEN", /// DENVER
  "YMIA", /// MIAMI
  "YORD", /// CHICAGO
] as const;

/// includes subsets in each such as low sulfur, reformulated and conventional
export const fuelType = [
  "EPMR", /// Regular Gasoline
  "EPMM", /// Mid-grade
  "EPMP", /// Premium Gasoline
  "EPD2D", /// No 2 Diesel
  "EPM0", /// Total Gasoline
] as const;
