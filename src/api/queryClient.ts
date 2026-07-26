import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

// 응답이 없는 네트워크 오류와 5xx만 재시도
const shouldRetry = (failureCount: number, error: Error) => {
  if (!isAxiosError(error)) return false;

  const status = error.response?.status;
  const isRetryable = status === undefined || status >= 500;

  return isRetryable && failureCount < 1;
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
