/** Validate user is not a bot with Cloudflare Turnsite
 *
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#siteverify-api-overview
 *
 * @module
 */

import {
  InputValidationException,
  InternalServerErrorException,
  UnauthorizedException,
} from "chanfana";

async function validateTurnstile(
  token: string,
  remoteip: string,
  appContext: Env,
) {
  const formData = new FormData();
  formData.append("secret", appContext.TURNSTILE_SECRET_KEY);
  formData.append("response", token);
  formData.append("remoteip", remoteip);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Turnstile validation error:", error);
    throw new InternalServerErrorException("Turnstile validation error");
  }
}

/** Only handles GET request currently. Verifying on GET request to prevent low effort bot scrapping */
async function handleTurnstileValidation(request: any, appContext: Env) {
  const token = request.raw.headers.get("token");
  const ip =
    request.raw.headers.get("CF-Connecting-IP") ||
    request.raw.headers.get("X-Forwarded-For") ||
    "unknown";

  if (!token) {
    throw new InputValidationException("Turnstile token is missing.");
  }

  const validation: any = await validateTurnstile(token, ip, appContext);

  if (validation.success) {
    /** Token is valid - process the form */
    console.log("Valid submission from:", validation.hostname);
  } else {
    /**  Token is invalid - reject the submission */
    console.log("Invalid token:", validation["error-codes"]);
    throw new UnauthorizedException("Invalid verification token.");
  }
}

export { handleTurnstileValidation };
