import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { postSignup } from "@/api/user/api";
import { PATH } from "@/routes/paths";
import { useAuthStore } from "@/stores/useAuthStore";

export const useSignup = () => {
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      setTokens(data);
      navigate(PATH.HOME, { replace: true });
    },
  });
};
