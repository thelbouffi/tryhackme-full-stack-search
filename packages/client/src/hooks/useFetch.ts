import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "@accommodations/shared-types";

function useFetch<T>(url: string): UseQueryResult<T | null, Error> {
  const fetchData = async (): Promise<T | null> => {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axios.get(url);

      if (response.status === 404) {
        return null;
      }

      const result = response.data;

      if (result.status === "ok") {
        return result.body || null;
      } else {
        throw new Error(result.message || "An error occurred");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse<T>>;
        if (axiosError.response?.status === 404) {
          return null; // reconfirm returning null for 404
        }
        const message = axiosError.response?.data.message || axiosError.message;
        throw new Error(message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  return useQuery<T | null, Error>({
    queryKey: ["fetchData", url],
    queryFn: fetchData,
    enabled: !!url,
    retry: false,
  });
}

export default useFetch;
