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
}

const useQueries = <TData>({
  prefixUrl,
  initialData,
  transformData,
  onError,
}: useQueriesOptions<TData>) => {
  const [state, setState] = useState<useQueriesState<TData>>({
    data: initialData || null,
    isLoading: true,
    isError: false,
    error: null,
  });

  const fetchData = useCallback(async (url: string) => {
    setState((prev) => ({ ...prev, isLoading: true, isError: false }));

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const { data } = await axios.get(BASE_URL + url);
      const transformedData = transformData?.(data.data) || data.data;
      setState((prev) => ({
        ...prev,
        isLoading: false,
        data: transformedData,
        isError: false,
      }));
    } catch (error) {
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
