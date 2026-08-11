import { ApiResponse, FetchConfig } from "./api";

// schema validation
import * as t from "io-ts";
import { PathReporter } from "io-ts/PathReporter";
import { isLeft } from "fp-ts/Either";

async function Fetch(url: string, config: FetchConfig): Promise<ApiResponse> {
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
    });

    const data: unknown = await response.json();

    const decoded = config.model.decode(data);
    if (isLeft(decoded)) {
      throw Error(
        `Could not validate data: ${PathReporter.report(decoded).join("\n")}`,
      );
    }

    type DataT = t.TypeOf<typeof config.model>; // compile-time type
    const decodedData: DataT = decoded.right; // now safely the correct type

    return { decodedData } as ApiResponse;
  } catch (error) {
    return {
      error: {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
    } as ApiResponse;
  }
}

export { Fetch };
