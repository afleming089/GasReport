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
  GasPeriodT,
  locations,
  fuelType,
  frequency,
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
        startDate: z.date().optional(),
        endDate: z.date().optional(),
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
    const { frequency, location, fuelType, startDate, endDate } = data.query;

    try {
      const url = new URL(c.env.END_POINT);

      url.searchParams.append("api_key", c.env.API_TOKEN);
      url.searchParams.append("frequency", frequency);
      url.searchParams.append("facets[product][]", fuelType);
      url.searchParams.append("facets[duoarea][]", location);
      url.searchParams.append("data[]", "value");
      startDate
        ? url.searchParams.append("start", startDate?.toString())
        : null;
      endDate ? url.searchParams.append("end", endDate?.toString()) : null;

      const response = await fetch(url.toString());

      const result: any = await response.json();

      if (response.ok) {
        console.log("okay");

        const pickSchemaValues = new PickSchemaValues(
          z.object({ name: z.string(), age: z.number() }),
          { age: true },
        );

        pickSchemaValues.getParsedObject({ name: "gabe", age: 20 });

        const gasPeriods = z.object(result.response.data);
        // console.log(result.response.data);

        const parsedGasPeriods = gasPeriods.pick({
          period: true,
          // areaName: true,
          // productName: true,
          value: true,
          units: true,
        });

        // console.log(parsedGasPeriods);

        return {
          total: parseInt(result.response.total),
          frequency: result.response.frequency,
          GasPeriods: z.array(parsedGasPeriods),
        };
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }
}
