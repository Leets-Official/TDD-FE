import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";

import { getApiErrorMessage, getApiFieldErrors } from "@/api/error";
import { useChangePassword } from "@/api/user/query";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import {
  passwordChangeSchema,
  type PasswordChangeFormValues,
} from "@/schemas/auth";
import { useAuthStore } from "@/stores/useAuthStore";

const PASSWORD_CHANGED_MODAL = {
  title: "비밀번호가 변경되었어요",
  description: "보안을 위해 다시 로그인해주세요.",
  primaryLabel: "로그인하러 가기",
  isDismissible: false,
} as const;

export function usePasswordChangeForm() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { openModal } = useModal();
  const { openToast } = useToast();
  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    mode: "onSubmit",
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  const [currentPassword, newPassword] = useWatch({
    control,
    name: ["currentPassword", "newPassword"],
  });
  const hasEmptyField = !currentPassword || !newPassword;

  const submitPasswordChange = handleSubmit((values) => {
    changePassword(values, {
      // 서버가 refresh token을 무효화해서 재로그인이 필요합니다
      onSuccess: () => {
        openModal({
          props: PASSWORD_CHANGED_MODAL,
          onConfirm: () => {
            clearAuth();
            queryClient.removeQueries();
          },
        });
      },
      onError: (error) => {
        const fieldErrors = getApiFieldErrors(error);
        const invalidFields = (
          Object.keys(values) as (keyof PasswordChangeFormValues)[]
        ).filter((field) => fieldErrors[field]);

        if (invalidFields.length > 0) {
          invalidFields.forEach((field) =>
            setError(field, { message: fieldErrors[field] })
          );

          return;
        }

        openToast({
          variant: "error",
          message: getApiErrorMessage(error, API_ERROR_MESSAGE.PASSWORD_CHANGE),
        });
      },
    });
  });

  return {
    register,
    errors,
    hasEmptyField,
    isPending,
    submitPasswordChange,
  };
}
