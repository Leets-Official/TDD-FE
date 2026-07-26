import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

// 네트워크 오류·5xx만 재시도
const shouldRetry = (failureCount: number, error: Error) => {
  const status = isAxiosError(error) ? error.response?.status : undefined;
  if (status && status >= 400 && status < 500) return false;

  return failureCount < 1;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20,
      gcTime: 1000 * 60 * 5,
      retry: shouldRetry,
      refetchOnWindowFocus: false,
    },
  },
});
