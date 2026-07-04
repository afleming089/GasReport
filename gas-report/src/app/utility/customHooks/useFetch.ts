import { useState, useEffect } from "react";
import {FetchData} from "../api/FetchData";
import { ApiResponse } from "../api/ApiResponse";
import { FetchConfig } from "../../utility/api/FetchConfig";

function useFetch<T>(url: string, config: FetchConfig): ApiResponse<T> {
  const [response, setResponse] = useState(<T> | null);
//   const [loading, setLoading] = useState(true);

  useEffect(() => {
    setResponse(FetchData<T>(url, config));

  }, [url]);

  return { response };
}

export { useFetch };
