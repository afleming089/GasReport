/**
 * Compares price from current period to the pervious period.
 *
 * Returns percent up or down
 * Returns dollar differences
 * @module
 */

import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

// types
import { locations, fuelType, frequency } from "../petroleumTypes";
import { type AppContext } from "../../../types";

export class ComparePeriodChanges extends OpenAPIRoute {
  schema = {
    tags: ["Compare Periods"],
    summary:
      "Compares the change from selected date period and compares it to the period before it. Can return percentage change of the two and or the price change of the two.",
    request: {
      params: z.object({
        frequency: z.enum(frequency),
        location: z.enum(locations),
        fuelType: z.enum(fuelType),
        date: z.date(),
      }),
    },
    responses: {
      "200": {
        description: "Returns a list Gas Periods",
        content: {
          "application/json": {
            schema: z.object({
              comparisonName: z.string(),
              percentChange: z.number().optional(),
              priceChange: z.number().optional(),
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
    const { frequency, location, fuelType, date } = data.params;

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
