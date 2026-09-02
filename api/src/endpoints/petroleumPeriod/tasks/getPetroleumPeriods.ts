/**
 * Get gas periods based on location, fuel-type and period frequency.
 *
 * Refer to {@link petroleumTypes} for info on location, fuel type and frequency parameters.
 *
 * Optional date range parameter. Defaults to max amount of data.
 * @module
 */

import { z } from "zod";
import { ApiException, OpenAPIRoute } from "chanfana";

import { PickSchemaValues } from "../../../utility/PickSchemaValues";

// types
import {
  GasPeriod,
  EIAGasPeriod as ResponseSchema,
  locations,
  fuelType,
  frequency,
  Year_Month_Day,
} from "../petroleumTypes";
import { type AppContext } from "../../../types";

export class GetPetroleumPeriods extends OpenAPIRoute {
  schema = {
    tags: ["GasPeriods"],
    summary:
      "Get gas periods based on location, fuel type and period timeline frequency. Can also add an optional date range parameter.",
    request: {
      query: z.object({
        frequency: z.enum(frequency),
        location: z.enum(locations),
        fuelType: z.enum(fuelType),
        start: z
          .string()
          .regex(Year_Month_Day, "Must be YYYY, YYYY-MM, or YYYY-MM-DD")
          .optional(),
        end: z
          .string()
          .regex(Year_Month_Day, "Must be YYYY, YYYY-MM, or YYYY-MM-DD")
          .optional(),
      }),
    },
    responses: {
      "200": {
        description: "Returns a list Gas Periods",
        content: {
          "application/json": {
            schema: z.object({
              total: z.int(),
              frequency: z.string(),
              gasPeriods: GasPeriod.array(),
            }),
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    /** Get validated data  */
    const data = await this.getValidatedData<typeof this.schema>();

    /** Retrieve the validated parameters  */
    const { frequency, location, fuelType, start, end } = data.query;

    try {
      const url = new URL(c.env.END_POINT);

      url.searchParams.append("api_key", c.env.API_TOKEN);
      url.searchParams.append("frequency", frequency);
      url.searchParams.append("facets[product][]", fuelType);
      url.searchParams.append("facets[duoarea][]", location);
      url.searchParams.append("data[]", "value");
      start ? url.searchParams.append("start", start) : null;
      end ? url.searchParams.append("end", end) : null;

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

        return {
          total: parseInt(result.response.total),
          frequency: result.response.frequency,
          GasPeriods: gasPeriods.getParsedArray(result.response.data),
        };
      }
    } catch (error) {
      console.log(error);
      throw new ApiException("Operation failed due to an unexpected error");
    }
  }
}
