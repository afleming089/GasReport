/**
 * Get gas periods based on location, fuel-type and period frequency.
 *
 * Refer to {@link petroleumTypes} for info on location, fuel type and frequency parameters.
 *
 * Optional date range parameter. Defaults to max amount of data.
 * @module
 */

import { InputValidationException, OpenAPIRoute } from "chanfana";
import { z } from "zod";

import { PickSchemaValues } from "../../../utility/PickSchemaValues";

/// types
import {
  GasPeriod,
  locations,
  fuelType,
  frequency,
  dateRegex,
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
          .regex(dateRegex, "Must be YYYY, YYYY-MM, or YYYY-MM-DD")
          .optional(),
        end: z
          .string()
          .regex(dateRegex, "Must be YYYY, YYYY-MM, or YYYY-MM-DD")
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
        ...InputValidationException.schema(), // Document HTTP 400 error
      },
    },
  };

  async handle(c: AppContext) {
    // Get validated data
    const data = await this.getValidatedData<typeof this.schema>();

    // Retrieve the validated parameters
    const { frequency, location, fuelType, start, end } = data.query;

    try {
      const url = new URL(c.env.END_POINT);

      url.searchParams.append("api_key", c.env.API_TOKEN);
      url.searchParams.append("frequency", frequency);
      url.searchParams.append("facets[product][]", fuelType);
      url.searchParams.append("facets[duoarea][]", location);
      url.searchParams.append("data[]", "value");
      start ? url.searchParams.append("start", start?.toString()) : null;
      end ? url.searchParams.append("end", end?.toString()) : null;

      const response = await fetch(url.toString());

      const result: any = await response.json();

      if (response.ok) {
        const pickSchemaValues = new PickSchemaValues(
          z.object({ name: z.string(), age: z.number() }),
          { name: true },
        );

        pickSchemaValues.getParsedObject({ name: "gabe", age: 20 });

        /// response schema from api endpoint and the desired values
        const gasPeriods = new PickSchemaValues(
          z.object({
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
          }),
          {
            period: true,
            "area-name": true,
            "product-name": true,
            value: true,
            units: true,
          },
        );

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
