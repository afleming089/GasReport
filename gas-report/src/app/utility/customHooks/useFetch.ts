import { useState, useEffect } from "react";
import { Fetch, ApiResponse, FetchConfig } from "../../utility/api/api";

function useFetch<T>(url: string, config: FetchConfig): ApiResponse<T> {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: undefined,
    error: { message: "Loading", status: 202 },
  });

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse: ApiResponse<T> = await Fetch<T>(url, config);
      setResponse(apiResponse);
    };

    fetchData();
  }, [url]);

  return response;
}

export default useFetch;
