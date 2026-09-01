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

import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

// types
import {
  GasPeriod,
  EIAGasPeriod as ResponseSchema,
  ComparedPeriod,
  locations,
  fuelType,
  Year_Month_Day,
} from "../petroleumTypes";
import { type AppContext } from "../../../types";
import { PickSchemaValues } from "../../../utility/PickSchemaValues";

export class ComparePeriods extends OpenAPIRoute {
  schema = {
    tags: ["Compare Periods"],
    summary:
      "Compares the change from selected date period and compares it to the period before it. Can return percentage change of the two and or the price change of the two.",
    request: {
      params: z.object({
        location: z.enum(locations),
        fuelType: z.enum(fuelType),
        referencePeriod: z
          .string()
          .regex(Year_Month_Day, "Must be YYYY, YYYY-MM, YYYY-MM-DD"),
        periodsToCompare: z.array(
          z.object({
            numberOfTimeFrames: z.int(),
            timeFrame: z.enum(["week", "month", "year"]),
          }),
        ),
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
              referencePeriod: z.object(GasPeriod),
              comparedPeriods: z.array(ComparedPeriod),
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
    const { location, fuelType, referenceDate, periodsBefore } = data.params;

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

        console.log(result.response);

        return {
          total: parseInt(result.response.total),
          frequency: result.response.frequency,
          GasPeriods: gasPeriods.getParsedArray(result.response.data),
        };
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }
}
