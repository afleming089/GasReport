/**
 * Generic Fetch hook
 * @module
 */

import { useEffect, useState } from "react";
import { ApiResponse, Fetch, FetchConfig } from "../../utility/api/api";

function useFetch(url: string, config: FetchConfig): ApiResponse {
  const [response, setResponse] = useState<ApiResponse>({
    data: undefined,
    error: { message: "Loading", status: 202 },
  });

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse: ApiResponse = await Fetch(url, config);
      setResponse(apiResponse);
      console.log(response);
    };

    fetchData();
  }, [url, config]);

  return response;
}

export default useFetch;
