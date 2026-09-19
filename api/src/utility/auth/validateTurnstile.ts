/** Validate user is not a bot with Cloudflare Turnsite
 *
 * https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#siteverify-api-overview
 *
 * @module
 */

import {
  ApiException,
  InputValidationException,
  InternalServerErrorException,
  UnauthorizedException,
} from "chanfana";

async function validateTurnstile(
  token: string,
  remoteip: string,
  secretKey: string,
) {
  // Input validation
  if (!token || typeof token !== "string") {
    throw new ApiException("Invalid token format");
  }

  if (token.length > 2048) {
    throw new ApiException("Token too long");
  }

  const controller = new AbortController();
  // 10 second time out
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);

    if (remoteip) {
      formData.append("remoteip", remoteip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        signal: controller.signal,
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Turnstile validation error:", error);
    throw new InternalServerErrorException("Turnstile validation error");
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Only handles GET request currently. Verifying on GET request to prevent low effort bot scrapping */
export default async function handleTurnstileValidation(
  request: any,
  token: string,
  secretKey: string,
) {
  const ip =
    request.raw.headers.get("CF-Connecting-IP") ||
    request.raw.headers.get("X-Forwarded-For") ||
    "unknown";

  if (!token) {
    throw new InputValidationException("Turnstile token is missing.");
  }

  const validation: any = await validateTurnstile(token, ip, secretKey);

  if (validation.success) {
    /** Token is valid - process the form */
    return await validation;
  } else {
    /**  Token is invalid - reject the submission */
    console.log("Invalid Turnstile token:", validation["error-codes"]);
    throw new UnauthorizedException("Unauthorized");
  }
}

export { handleTurnstileValidation };
