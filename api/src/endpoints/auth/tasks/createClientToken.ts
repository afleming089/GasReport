/**
 * Create a JSON Web Token
 *
 * @module
 */

import { z } from "zod";
import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../../types";
import { getAndroidAppToken } from "../../../utility/googleapis";

export class CreateClientToken extends OpenAPIRoute {
  schema = {
    request: {
      body: contentJson(
        z.object({
          appIntegrityToken: z.string(),
        }),
      ),
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
    const { appIntegrityToken } = data.body;

    console.log(getAndroidAppToken(appIntegrityToken));

    return { data: "create endpoint" };
  }
}
