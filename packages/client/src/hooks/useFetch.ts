import { useState, useEffect } from "react";
import { ApiResponse } from "@accommodations/shared-types";

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | string | null;
}

function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | string | null>(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);

        // Handle 404 Not Found case
        if (response.status === 404) {
          // const result: ApiResponse<T> = await response.json();
          if (isMounted) {
            setData(null);
            // setError(result.message || 'Resource not found');
            setError(null);
          }
          return;
        }

        // Handle other non-OK statuses
        if (!response.ok) {
          console.log({ response });
          const errorBody: ApiResponse<T> = await response.json();
          if (errorBody.message) {
            throw new Error(errorBody.message);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        // Handle ok status
        const result: ApiResponse<T> = await response.json();

        if (isMounted) {
          if (result.status === "ok") {
            setData(result.body || null);
            setError(null);
          } else if (result.status === "error") {
            setData(null);
            setError(result.message || "An error occurred");
          }
        }
      } catch (e) {
        if (isMounted) {
          setError(
            e instanceof Error ? e.message : "An unknown error occurred"
          );
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
