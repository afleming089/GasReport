import { ApiResponse, FetchConfig } from "./api";

async function Fetch<T>(
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
      } as ApiResponse<T>;
    }

    const data: T = (await response.json()) as T;
    return { data } as ApiResponse<T>;
  } catch (error) {
    return {
      error: {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
    } as ApiResponse<T>;
  }
}

export { Fetch };
