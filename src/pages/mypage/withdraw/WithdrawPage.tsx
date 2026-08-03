import { Button } from "@/components/button/Button";
import { TextField } from "@/components/textField/TextField";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";

import { useWithdrawForm } from "./hooks/useWithdrawForm";

const WITHDRAW_FORM_ID = "withdraw-form";

export function WithdrawPage() {
  const { register, errors, password, isPending, submitWithdraw } =
    useWithdrawForm();

  return (
    <PageShell
      header={<BackHeader title="회원탈퇴" />}
      bottom={
        <Button
          type="submit"
          form={WITHDRAW_FORM_ID}
          className="w-full"
          disabled={!password || isPending}
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
        <form id={WITHDRAW_FORM_ID} onSubmit={submitWithdraw} noValidate>
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
