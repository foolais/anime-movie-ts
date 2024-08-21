import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface useQueriesOptions<TData> {
  prefixUrl?: string;
  initialData?: TData | null;
  transformData?: (data: any) => TData;
  onError?: (error: any) => void;
}

interface useQueriesState<TData> {
  data?: TData | null;
  isLoading: boolean;
  isError: boolean;
  error?: any;
  pagination?: any;
}

const useQueries = <TData>({
  prefixUrl,
  initialData,
  transformData,
  onError,
}: useQueriesOptions<TData>) => {
  const [state, setState] = useState<useQueriesState<TData>>({
    data: initialData || null,
    pagination: null,
    isLoading: true,
    isError: false,
    error: null,
  });

  const fetchData = useCallback(async (url: string) => {
    if (!url) return;
    setState((prev) => ({ ...prev, isLoading: true, isError: false }));

    try {
      if (url.includes("undefined")) {
        setState((prev) => ({ ...prev, isLoading: false, isError: true }));
        throw new Error("URL includes undefined");
      }

      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.get(BASE_URL + url);

      if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const { data } = response;
      const transformedData = transformData?.(data.data) || data.data;
      setState((prev) => ({
        ...prev,
        pagination: data?.pagination,
        isLoading: false,
        data: transformedData,
        isError: false,
      }));
    } catch (error: any) {
      console.log({ error });
      onError?.(error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error,
        isError: true,
      }));
    }
  }, []);

  useEffect(() => {
    if (prefixUrl) fetchData(prefixUrl);
  }, [fetchData, prefixUrl]);

  return { ...state };
};

export default useQueries;
