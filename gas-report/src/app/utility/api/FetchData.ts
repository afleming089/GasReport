import { ApiResponse } from "../../utility/api/ApiResponse";
import { FetchConfig } from "../../utility/api/FetchConfig";

async function FetchData<T>(
  url: string,
  config: FetchConfig = {},
): Promise<ApiResponse<T>> {
  try {
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

    // Check for HTTP errors
    if (!response.ok) {
      return {
        error: {
          message: `HTTP error: ${response.statusText}`,
          status: response.status,
        },
      };
    }

    const data: T = await response.json();
    return { data };
  } catch (error) {
    return {
      error: {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
}

export { FetchData };
