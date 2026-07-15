import { ApiResponse, FetchConfig } from "./api";
import * as t from "io-ts";
import { PathReporter } from "io-ts/PathReporter";
import { isLeft } from "fp-ts/Either";

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

    console.log(config);

    const data: T = (await response.json()) as T;

    const decoded = config.type.decoded(data);
    // if (isLeft(decoded)) {
    //   throw Error(
    //     `Could not validate data: ${PathReporter.report(decoded).join("\n")}`,
    //   );
    //   // e.g.: Could not validate data: Invalid value "foo" supplied to : { userId: number, name: string }/userId: number
    // }

    // type DataT = t.TypeOf<typeof config.type>; // compile-time type
    // const decodedData: DataT = decoded.right; // now safely the correct type

    // return { decodedData } as ApiResponse<T>;
    // // Check for HTTP errors
    // if (!response.ok) {
    //   return {
    //     error: {
    //       message: `HTTP error: ${response.statusText}`,
    //       status: response.status,
    //     },
    //   } as ApiResponse<T>;
    // }
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
