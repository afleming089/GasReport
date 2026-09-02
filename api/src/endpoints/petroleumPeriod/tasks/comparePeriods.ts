/**
 * Compares gas periods from a reference date to periods before it.
 *
 * Query Params:
 * referenceDate: the date you want to compare to dates before it
 *
 * periodsBefore array:
 * periodsBefore holds objects that have a weeksBefore attribute and a frequency attribute
 *
 * periodsBefore schema example
 *
 * {
 *    amountBefore: int,
 *    frequency: "weekly" | "monthly" | "annual"
 * }
 *
 * Max of 10 years on comparisons
 *
 * Returns percent up or down for each period compared to referenceDate
 * Returns dollar differences for each period compared to referenceDate
 * Returns the price for each period before
 *
 * @module
 */

import { z } from "zod";
import { ApiException, OpenAPIRoute } from "chanfana";

// types
import {
  GasPeriod,
  EIAGasPeriod as ResponseSchema,
  ComparedPeriod,
  PeriodNull,
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
      "Compares the change from selected date period and compares it to the period before it. Can return percentage change of the two and or the price change of the two.",
    request: {
      query: z.object({
        location: z.enum(locations),
        fuelType: z.enum(fuelType),
        referenceDate: z
          .string()
          .regex(Year_Month_Day, "Must be YYYY, YYYY-MM, YYYY-MM-DD"),
        /**
         * periodsToCompare is how ever many intervals back from the referencePeriod
         *
         * So count: 2 and unit: week would get the period two weeks before referencePeriod
         *
         * Is an array so you can pass in multiple periodsToCompare
         *
         * It is easier to say compare this date, referencePeriod, to a date 3 weeks ago instead of needing to find the exact date that was three weeks before referencePeriod. 3 weeks may be easy to find but say compare this date to one 6 years ago. Finding that exact date manually would get repetitive given leap years and what not. Here you just put in a reference date and say compare this date to one 3 weeks ago or 5 month ago and etc.
         */
        periodsToCompare: z
          .array(
            z.object({
              count: z.number().int().positive().meta({
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
              "periodsToCompare is how ever many intervals back from the referencePeriod. Interval count is the number of intervals and intervalUnit is the unit of time frames such as week, month or year. Has an array so you can pass in as many periodsToCompare as you like. Max of 10 years back.",
          }),
        getPercentChange: z.boolean().default(true),
        getPriceChange: z.boolean().default(false),
      }),
    },
    responses: {
      "200": {
        description: "Returns a list Gas Periods",
        content: {
          "application/json": {
            schema: z.object({
              referencePeriod: z
                .object(GasPeriod)
                .describe(
                  "Period date is the date most close to the requested date. If there is not a period on 2026-04-01 for example it will return a period that actually exist in the database that is closest to that date. It will be with in a week of the requested date. The API only tracks data over the span of a week not each day.",
                ),
              comparedPeriods: z.array(ComparedPeriod.or(PeriodNull)),
            }),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    // Get validated data
    const data = await this.getValidatedData<typeof this.schema>();

    // Retrieve the validated parameters
    const { location, fuelType, referenceDate, periodsToCompare } = data.query;

    /**
     * Returns weekly frequency always
     * Can only go back 10 years from referenceDate
     *
     * fetch start referenceDate end referenceDate - 10 years
     *
     * Get all data from reference date to 10 years before with the frequency of weekly
     * Start at top which is the referenceDate
     * Use periodsBefore amountBefore int attribute to go back how ever many periods
     * Multiply that with frequency type. If it is a week multiply by 1 if it is a month multiply by 4, year multiply by 52
     * Add to a array to be returned
     *
     * Let full comparison happen but if it is to far back. Like it dose not exist then just return null for that data point and explain it dose not exist
     */

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

      if (response.ok) {
        /** response schema from api endpoint and the desired values */
        const gasPeriods = new PickSchemaValues(ResponseSchema, {
          period: true,
          "area-name": true,
          "product-name": true,
          value: true,
          units: true,
        });

        const resultLength: number = result.response.total - 1;

        // get top and set as referenceDatePeriod
        const referencePeriod: GasPeriodT = gasPeriods.getParsedObject(
          result.response.data[resultLength],
        );
        // go through data set based on periodsToCompare and find the right date for each of those and add to comparedPeriods return array. if dose not exist, like end of dataset return PeriodNull object
        console.log(result.response);
        console.log(referencePeriod);

        const comparedPeriods = z.array(ComparedPeriod.or(PeriodNull));
        /**
         * For each periodToCompare go back how ever many intervals from the reference period and add the found period
         * to a ComparedPeriod schema if exist or a PeriodNull if it dose not exist. Pushes to an array that will be
         * returned in response.
         */
        periodsToCompare.forEach((period) => {
          /** Multiple of the a week */
          let multiple: number;
          switch (period.unit) {
            case "week":
              multiple = 1;
              break;
            case "month":
              multiple = 4;
              break;
            case "year":
              multiple = 52;
              break;
            default:
              multiple = 0;
              break;
          }

          // see what happens when you are at the end of the data. what is returned
          const comparedPeriod =
            result.response.data[resultLength - period.count * multiple];

          // if (comparedPeriod) comparedPeriods.parse(ComparedPeriod.parse(data));
        });
      }

      // return {
      //   total: parseInt(result.response.total),
      //   frequency: result.response.frequency,
      //   GasPeriods: gasPeriods.getParsedArray(result.response.data),
      // };
    } catch (error) {
      console.log(error);
      throw new ApiException("Operation failed due to an unexpected error");
    }
  }
}
