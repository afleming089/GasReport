/**
 * Generic Fetch hook
 * @module
 */

import { useEffect, useState } from "react";
import {
  ApiResponse,
  ApiResponseT,
  Fetch,
  FetchConfig,
} from "../../utility/api/api";

function useFetch(url: string, config: FetchConfig): ApiResponseT<any> {
  const [response, setResponse] = useState<ApiResponseT<any>>({
    data: undefined,
    error: { message: "Loading", status: 202 },
  });

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse: ApiResponseT<any> = await Fetch(url, config);
      setResponse(apiResponse);
    };

    fetchData();
  }, [url, config]);

  return response;
}

export default useFetch;
