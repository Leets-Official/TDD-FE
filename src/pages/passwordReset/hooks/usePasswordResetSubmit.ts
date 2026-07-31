import { getApiErrorMessage } from "@/api/error";
import { usePasswordReset } from "@/api/auth/query";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import { useToast } from "@/hooks/useToast";
import type { PasswordFormValues } from "@/schemas/auth";

interface UsePasswordResetSubmitOptions {
  email: string;
  onSuccess: () => void;
}

export function usePasswordResetSubmit({
  email,
  onSuccess,
}: UsePasswordResetSubmitOptions) {
  const { openToast } = useToast();
  const { mutate: resetPassword, isPending } = usePasswordReset();

  const submitPassword = (values: PasswordFormValues) => {
    resetPassword(
      { email, newPassword: values.password },
      {
        onSuccess,
        onError: (error) => {
          openToast({
            variant: "error",
            message: getApiErrorMessage(
              error,
              API_ERROR_MESSAGE.PASSWORD_RESET
            ),
          });
        },
      }
    );
  };

  return { submitPassword, isPending };
}
