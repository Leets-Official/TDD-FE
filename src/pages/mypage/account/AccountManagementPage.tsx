import { Button } from "@/components/button/Button";
import { TextField } from "@/components/textField/TextField";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { ACCOUNT_NUMBER_MAX_LENGTH } from "@/schemas/account";

import { useAccountForm } from "./hooks/useAccountForm";

const ACCOUNT_FORM_ID = "account-form";

export function AccountManagementPage() {
  const {
    register,
    errors,
    accountNumberField,
    handleAccountNumberFocus,
    handleAccountNumberChange,
    hasEmptyField,
    isLoading,
    isSubmitting,
    submitAccount,
  } = useAccountForm();

  return (
    <PageShell
      header={<BackHeader title="계좌번호 등록" />}
      bottom={
        <Button
          type="submit"
          form={ACCOUNT_FORM_ID}
          className="w-full"
          disabled={hasEmptyField || isLoading || isSubmitting}
        >
          완료
        </Button>
      }
    >
      <div className="mt-6 flex w-full flex-col gap-5 px-5">
        <h1 className="text-title-1 text-black">계좌번호 등록</h1>
        <form
          id={ACCOUNT_FORM_ID}
          onSubmit={submitAccount}
          noValidate
          className="flex w-full flex-col gap-4"
        >
          <TextField
            label="은행"
            placeholder="은행 입력(ex. 우리은행, 농협은행...)"
            autoFocus
            state={errors.bank ? "error" : "default"}
            feedback={errors.bank?.message}
            {...register("bank")}
          />
          <TextField
            label="계좌번호"
            placeholder="계좌번호 입력(-없이)"
            inputMode="numeric"
            maxLength={ACCOUNT_NUMBER_MAX_LENGTH}
            state={errors.accountNumber ? "error" : "default"}
            feedback={errors.accountNumber?.message}
            {...accountNumberField}
            onFocus={handleAccountNumberFocus}
            onChange={handleAccountNumberChange}
          />
          <TextField
            label="예금주"
            placeholder="예금주 입력"
            state={errors.accountHolder ? "error" : "default"}
            feedback={errors.accountHolder?.message}
            {...register("accountHolder")}
          />
        </form>
      </div>
    </PageShell>
  );
}
