/**
 * Validates user is not a bot.
 *
 * Creates a JSON Web Token to send back to them
 *
 * @module
 */

import { z } from "zod";
import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../../types";
import { getAndroidAppToken } from "../../../utility/googleapis";
import validateTurnstile from "../../../utility/auth/validateTurnstile";
import { SignJWT } from "jose";
import { ApiResponse } from "../../../models/api";
import { JWTPayload } from "hono/utils/jwt/types";

export class CreateClientToken extends OpenAPIRoute {
  schema = {
    request: {
      body: contentJson(
        z.object({
          appIntegrityToken: z.string().optional(),
          turnstileToken: z.string().optional(),
        }),
      ),
    },
    responses: {
      "200": {
        description: "Returns a list of compared GasPeriods",
        ...contentJson(ApiResponse(z.object({ sessionToken: z.string() }))),
      },
    },
  };

  async handle(c: AppContext) {
    /**  Get validated data */
    const data = await this.getValidatedData<typeof this.schema>();

    /** Retrieve the validated parameters */
    const { appIntegrityToken, turnstileToken } = data.body;

    async function generateJWT(payload: JWTPayload): Promise<string> {
      const secret = new TextEncoder().encode(process.env.JWT_ENCODER);
      const alg = "HS256";

      const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime("3m")
        .sign(secret);

      return jwt;
    }

    let jwt: Promise<string> | null = null;
    /** Android */
    if (appIntegrityToken) getAndroidAppToken(appIntegrityToken);

    /** Web */
    if (turnstileToken) {
      const hash = await validateTurnstile(
        c.req,
        turnstileToken,
        process.env.TURNSTILE_SECRET_KEY,
      );

      jwt = generateJWT({ key: hash });
    }

    return { sessionToken: await jwt };
  }
}
