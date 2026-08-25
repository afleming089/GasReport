// get gas periods based on location, fuel type and period timeline frequency
// fuel type : regular, mid grade, premium or diesel
// frequency : weekly, monthly or yearly
// locations :

// optional date range parameter. Defaults to max amount of data

import { InputValidationException, OpenAPIRoute } from "chanfana";
import { z } from "zod";

// types
import { GasPeriod, locations, fuelType, frequency } from "../petroleumTypes";
import { type AppContext } from "../../../types";

export class GetPetroleumPeriods extends OpenAPIRoute {
  schema = {
    tags: ["GasPeriods"],
    summary:
      "Get gas periods based on location, fuel type and period timeline frequency. Can also add an optional date range parameter.",
    request: {
      params: z.object({
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
              status: z.int(),
              numberOfPeriods: z.int().optional(),
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
    const { frequency, location, fuelType, startDate, endDate } = data.params;

    // Implement your own object list here

    return {
      success: true,
      tasks: [
        {
          name: "Clean my room",
          slug: "clean-room",
          description: undefined,
          completed: false,
          due_date: "2025-01-05",
        },
        {
          name: "Build something awesome with Cloudflare Workers",
          slug: "cloudflare-workers",
          description: "Lorem Ipsum",
          completed: true,
          due_date: "2022-12-24",
        },
      ],
    };
  }
}
