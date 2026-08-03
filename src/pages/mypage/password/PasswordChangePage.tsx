import { Button } from "@/components/button/Button";
import { TextField } from "@/components/textField/TextField";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { PASSWORD_HINT } from "@/schemas/auth";

import { usePasswordChangeForm } from "./hooks/usePasswordChangeForm";

const PASSWORD_CHANGE_FORM_ID = "password-change-form";

export function PasswordChangePage() {
  const { register, errors, hasEmptyField, isPending, submitPasswordChange } =
    usePasswordChangeForm();

  return (
    <PageShell
      header={<BackHeader title="비밀번호 재설정" />}
      bottom={
        <Button
          type="submit"
          form={PASSWORD_CHANGE_FORM_ID}
          className="w-full"
          disabled={hasEmptyField || isPending}
        >
          완료
        </Button>
      }
    >
      <div className="mt-6 flex w-full flex-col gap-5 px-5">
        <h1 className="text-title-1 text-black">비밀번호 재설정</h1>
        <form
          id={PASSWORD_CHANGE_FORM_ID}
          onSubmit={submitPasswordChange}
          noValidate
          className="flex w-full flex-col gap-4"
        >
          <TextField
            label="현재 비밀번호"
            placeholder="현재 비밀번호 입력"
            autoFocus
            type="password"
            autoComplete="current-password"
            state={errors.currentPassword ? "error" : "default"}
            feedback={errors.currentPassword?.message}
            {...register("currentPassword")}
          />
          <TextField
            label="새 비밀번호"
            placeholder="새 비밀번호 입력"
            type="password"
            autoComplete="new-password"
            state={errors.newPassword ? "error" : "default"}
            feedback={errors.newPassword?.message ?? PASSWORD_HINT}
            {...register("newPassword")}
          />
        </form>
      </div>
    </PageShell>
  );
}
