/**
 * Compares gas periods from a reference date to periods before it.
 *
 * Query Params:
 * referenceDate: the date you want to compare to dates before it.
 *
 * periodsBefore array: Periods before referenceDate. Will be compared to referenceDates period.
 * periodsBefore holds objects that have a unitCount attribute and a unit attribute.
 *
 * periodsBefore schema example
 *
 * {
 *    unitCount: int,
 *    unit: "week" | "month" | "year"
 * }
 *
 * Returns percent change from compared periods to referenceDate
 * Returns price change from compared periods to referenceDate
 * Returns the price of the product at the compared periods date
 * @module
 */

import { z } from "zod";
import { ApiException, InputValidationException, OpenAPIRoute } from "chanfana";

// types
import {
  GasPeriod,
  EIAResponse,
  ComparedGasPeriod,
  ComparedGasPeriodT,
  NullPeriod,
  NullPeriodT,
  locations,
  fuelType,
  Year_Month_Day,
  GasPeriodT,
} from "../petroleumTypes";
import { type AppContext } from "../../../types";
import { PickSchemaValues } from "../../../utility/PickSchemaValues";

export class ComparePeriods extends OpenAPIRoute {
  schema = {
    tags: ["Compare Periods"],
    summary:
      "Takes a reference periods price and compares it to period prices before it. Returns the difference in dollars, and percentage change between the reference period and the compared period. Compared periods price is returned as well. Can compare multiple periods to the reference period in one call. Returns an array of ComparedGasPeriod.",
    request: {
      query: z.object({
        location: z.enum(locations),
        fuelType: z.enum(fuelType),
        referenceDate: z
          .string()
          .regex(Year_Month_Day, "Must be YYYY, YYYY-MM, YYYY-MM-DD"),
        /**
         * priorPeriods is how ever many intervals back from the referencePeriod
         *
         * So count: 2 and unit: week would get the period two weeks before referencePeriod
         *
         * Is an array so you can pass in multiple priorPeriods
         *
         * It is easier to say compare this date, referencePeriod, to a date 3 weeks ago instead of needing to find the
         * exact date that was three weeks before referencePeriod. 3 weeks may be easy to find but say compare this
         * date to one 6 years ago. Finding that exact date manually would get repetitive given leap years and what
         * not. Here you just put in a reference date and say compare this date to one 3 weeks ago or 5 month ago and
         * etc.
         */
        priorPeriods: z.preprocess(
          (jsonString: string) => {
            return JSON.parse(jsonString);
          },
          z
            .array(
              z.object({
                unitCount: z.number().int().positive().meta({
                  description:
                    "The number of intervals to look back from the reference period.",
                }),
                unit: z.enum(["week", "month", "year"]).meta({
                  description: "Interval units.",
                }),
              }),
            )
            .meta({
              description:
                "priorPeriods is how ever many intervals back from the referencePeriod. Interval count is the number of intervals and intervalUnit is the unit of time frames such as week, month or year. Has an array so you can pass in as many priorPeriods as you like. Max of 10 years back.",
            }),
        ),
      }),
    },
    responses: {
      "200": {
        description: "Returns a list of compared GasPeriods",
        content: {
          "application/json": {
            schema: z.object({
              referencePeriod: z
                .object(GasPeriod)
                .describe(
                  "Period date is the date most close to the requested date. If there is not a period on 2026-04-01 for example it will return a period that actually exist in the database that is closest to that date. It will be with in a week of the requested date. The API only tracks data over the span of a week not each day.",
                ),
              comparedGasPeriods: z
                .array(ComparedGasPeriod.or(NullPeriod))
                .describe(
                  "Final comparison of priorPeriods to the referencePeriod.",
                ),
            }),
          },
        },
      },
      ...InputValidationException.schema(),
    },
  };

  async handle(c: AppContext) {
    // Get validated data
    const data = await this.getValidatedData<typeof this.schema>();

    // Retrieve the validated parameters
    const { location, fuelType, referenceDate, priorPeriods } = data.query;

    try {
      const url = new URL(c.env.END_POINT);

      url.searchParams.append("api_key", c.env.API_TOKEN);
      url.searchParams.append("facets[product][]", fuelType);
      url.searchParams.append("frequency", "weekly");
      url.searchParams.append("facets[duoarea][]", location);
      url.searchParams.append("data[]", "value");
      url.searchParams.append("end", referenceDate); // end date

      const response = await fetch(url.toString());
      const result: any = await response.json();

      const rawData = result.response.data;

      /** Takes raw response EIA api and picks desired values from it. Only the schema is created here. Need to pass in object to be picked still */
      const pick = new PickSchemaValues(EIAResponse, {
        period: true,
        "area-name": true,
        "product-name": true,
        value: true,
        units: true,
      });

      /**  referenceDate period data */
      const referencePeriod: GasPeriodT = pick.getParsedObject(
        rawData[rawData.length - 1],
      );

      /** To be parsed into comparedGasPeriods schema then responded parameter returned to user.*/
      const comparedGasPeriods: Array<ComparedGasPeriodT | NullPeriodT> = [];

      if (response.ok) {
        /**
         * Each data index holds a week of gas period data.
         *
         * Last item of the data array is the referenceDate. It is the latest date in the data set and is what is compared to other periods before it.
         *
         * Uses period.unit to see how many weeks to go back in the data.
         * So a month would hold four weeks so to go back 1 month you multiply period.unitCount, number of months, by weeksInUnit. weeksInUnit is found by the switch statement. So if period.unit was month that would mean the number of weeks in that unit would be four since there is about four weeks in a month.
         *
         * Then to find the desired period it starts at the top of data array and subtracts the number of weeks from the data length to get the week of the desired period.
         */
        priorPeriods.forEach((period) => {
          /** the approximant number of weeks for each unit */
          let weeksInUnit: number = 0;
          switch (period.unit) {
            case "week":
              weeksInUnit = 1;
              break;
            case "month":
              weeksInUnit = 4;
              break;
            case "year":
              weeksInUnit = 52;
              break;
          }

          /** Finds period to compare in rawData then adds the desired values defined in pick and then returns a parsed zod object.*/
          const priorPeriod = pick.getParsedObject(
            rawData[rawData.length - 1 - period.unitCount * weeksInUnit],
          );

          // if exist
          if (priorPeriod !== undefined) {
            const comparedGasPeriod: ComparedGasPeriodT = {
              ...priorPeriod,
              timeAgo: `${period.unitCount} ${period.unit}`,
              percentChange: (
                ((referencePeriod.value - priorPeriod.value) /
                  Math.abs(priorPeriod.value)) *
                100
              ).toFixed(2),
              priceChange: (referencePeriod.value - priorPeriod.value).toFixed(
                2,
              ),
            };

            comparedGasPeriods.push(comparedGasPeriod);
          } else {
            const nullPeriod: NullPeriodT = {
              success: false,
              message: `Period ${period.unitCount} ${period.unit} before ${referenceDate} dose not exist.`,
            };

            comparedGasPeriods.push(nullPeriod);
          }
        });
      }

      return {
        referencePeriod: referencePeriod,
        comparedGasPeriods: comparedGasPeriods,
      };
    } catch (error) {
      console.log(error);
      throw new ApiException("Operation failed due to an unexpected error");
    }
  }
}
