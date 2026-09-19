/**
 * Handles fetch and schema validation with zod.
 * Ensures that at runtime if api response schema changes it will throw an error.
 *
 * @module
 */

import { ApiResponseT, ApiResponse } from "./model/ApiResponse";
import { FetchConfig } from "./FetchConfig";

// schema validation
import { z } from "zod";

async function Fetch(
  url: string,
  config: FetchConfig,
): Promise<ApiResponseT<any>> {
  try {
    if (!config.model)
      throw new Error(
        "Model can not be undefined. Needed for schema validation.",
      );

    // Construct URL with query parameters
    let finalUrl = url;
    if (config.queryParams) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(config.queryParams)) {
        params.append(key, value.toString());
      }
      finalUrl = `${url}?${params.toString()}`;
    }

    const response = await fetch(finalUrl, {
      method: config.method || "GET",
      headers: config.headers,
      body: config.body,
    });

    const data: unknown = await response.json();

    const decodedData = config.model.safeParse(data);

    if (!decodedData.success) {
      console.log(`Could not validate data: `, decodedData.error);
      throw Error(`Could not validate data: `, decodedData.error);
    }

    return {
      data: decodedData.data,
      success: decodedData.success,
    } as ApiResponseT<any>;
  } catch (error) {
    return {
      error: {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
    } as ApiResponseT<any>;
  }
}

export { Fetch };
