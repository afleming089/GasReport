/**
 * Create a JSON Web Token
 *
 * @module
 */

import { z } from "zod";
import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../../types";

export class CreateClientToken extends OpenAPIRoute {
  schema = {
    request: {
      query: z.object({}),
    },
    responses: {
      "200": {
        description: "Returns a list of compared GasPeriods",
        ...contentJson(z.object({})),
      },
    },
  };

  async handle(c: AppContext) {
    /**  Get validated data */
    const data = await this.getValidatedData<typeof this.schema>();

    /** Retrieve the validated parameters */
    //const { location, fuelType, referenceDate, priorPeriods } = data.query;

    return {};
  }
}
