import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { getApiErrorMessage } from "@/api/error";
import { useWithdraw } from "@/api/user/query";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import {
  passwordConfirmSchema,
  type PasswordConfirmFormValues,
} from "@/schemas/auth";

const WITHDRAW_CONFIRM_MODAL = {
  title: "정말 탈퇴하시겠어요?",
  description:
    "탈퇴 시 계정 정보와 배달팟 이용 기록이 모두 삭제되며, 복구할 수 없어요.",
  outlineLabel: "취소",
  primaryLabel: "탈퇴하기",
  isDestructive: true,
} as const;

export function useWithdrawForm() {
  const { openModal } = useModal();
  const { openToast } = useToast();
  const { mutate: withdraw, isPending } = useWithdraw();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordConfirmFormValues>({
    resolver: zodResolver(passwordConfirmSchema),
    mode: "onSubmit",
    defaultValues: { password: "" },
  });

  const password = useWatch({ control, name: "password" });

  const submitWithdraw = handleSubmit((values) => {
    openModal({
      props: WITHDRAW_CONFIRM_MODAL,
      onConfirm: () => {
        withdraw(values, {
          onError: (error) => {
            openToast({
              variant: "error",
              message: getApiErrorMessage(error, API_ERROR_MESSAGE.WITHDRAW),
            });
          },
        });
      },
    });
  });

  return { register, errors, password, isPending, submitWithdraw };
}
