import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import {
  login,
  logout,
  patchPasswordReset,
  postSendEmailCode,
  postVerifyEmailCode,
} from "@/api/auth/api";
import { PATH } from "@/routes/paths";
import { useAuthStore } from "@/stores/useAuthStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: login,
    onSuccess: (tokens) => {
      setTokens(tokens);
      navigate(PATH.HOME, { replace: true });
    },
  });
};

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAuth();
      queryClient.removeQueries();
    },
  });
};

export const useSendEmailCode = () => {
  return useMutation({
    mutationFn: postSendEmailCode,
  });
};

export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: postVerifyEmailCode,
  });
};

export const usePasswordReset = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: patchPasswordReset,
    onSuccess: () => {
      navigate(PATH.LOGIN, { replace: true });
    },
  });
};
