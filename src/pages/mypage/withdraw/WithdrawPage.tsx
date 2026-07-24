import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { Button } from "@/components/button/Button";
import { TextField } from "@/components/textField/TextField";
import { useModal } from "@/hooks/useModal";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";
import {
  passwordConfirmSchema,
  type PasswordConfirmFormValues,
} from "@/schemas/auth";

const WITHDRAW_FORM_ID = "withdraw-form";

export function WithdrawPage() {
  const navigate = useNavigate();
  const { openModal } = useModal();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PasswordConfirmFormValues>({
    resolver: zodResolver(passwordConfirmSchema),
    mode: "onSubmit",
    defaultValues: { password: "" },
  });

  const password = useWatch({ control, name: "password" });

  const onSubmit = (_values: PasswordConfirmFormValues) => {
    openModal({
      props: {
        title: "정말 탈퇴하시겠어요?",
        description:
          "탈퇴 시 계정 정보와 배달팟 이용 기록이 모두 삭제되며, 복구할 수 없어요.",
        outlineLabel: "취소",
        primaryLabel: "탈퇴하기",
        isDestructive: true,
      },
      onConfirm: () => {
        // TODO: 비밀번호 확인 후 회원탈퇴 API 연동
        navigate(PATH.LOGIN, { replace: true });
      },
    });
  };

  return (
    <PageShell
      header={<BackHeader title="회원탈퇴" />}
      bottom={
        <Button
          type="submit"
          form={WITHDRAW_FORM_ID}
          className="w-full"
          disabled={!password || isSubmitting}
        >
          완료
        </Button>
      }
    >
      <div className="flex w-full flex-col gap-4 px-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-title-1 text-black">본인 확인</h1>
          <p className="text-body-1 text-text-4">
            안전한 탈퇴를 위해 현재 비밀번호를 입력해주세요.
          </p>
        </div>
        <form
          id={WITHDRAW_FORM_ID}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            label="비밀번호"
            placeholder="비밀번호 입력"
            autoFocus
            type="password"
            autoComplete="current-password"
            state={errors.password ? "error" : "default"}
            feedback={errors.password?.message}
            {...register("password")}
          />
        </form>
      </div>
    </PageShell>
  );
}
