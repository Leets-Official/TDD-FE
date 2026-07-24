import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { Button } from "@/components/button/Button";
import { TextField } from "@/components/textField/TextField";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import {
  accountFormSchema,
  ACCOUNT_NUMBER_MAX_LENGTH,
  type AccountFormValues,
} from "@/schemas/account";

import { mockAccount } from "./account.mock";

const ACCOUNT_FORM_ID = "account-form";

export function AccountManagementPage() {
  const navigate = useNavigate();

  // TODO: 계좌 조회 API 연동 (mock 대체). 미등록이면 빈 폼으로 시작합니다.
  const account = mockAccount;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onSubmit",
    defaultValues: {
      bank: account?.bank ?? "",
      accountNumber: account?.accountNumber ?? "",
      accountHolder: account?.accountHolder ?? "",
    },
  });

  const [bank, accountNumber, accountHolder] = useWatch({
    control,
    name: ["bank", "accountNumber", "accountHolder"],
  });
  const hasEmptyField = !bank || !accountNumber || !accountHolder;

  const onSubmit = (_values: AccountFormValues) => {
    // TODO: 계좌번호 등록 API 연동
    navigate(-1);
  };

  const accountNumberField = register("accountNumber");
  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value = event.target.value.replace(/\D/g, "");
    accountNumberField.onChange(event);
  };

  return (
    <PageShell
      header={<BackHeader title="계좌번호 등록" />}
      bottom={
        <Button
          type="submit"
          form={ACCOUNT_FORM_ID}
          className="w-full"
          disabled={hasEmptyField || isSubmitting}
        >
          완료
        </Button>
      }
    >
      <div className="mt-6 flex w-full flex-col gap-5 px-5">
        <h1 className="text-title-1 text-black">계좌번호 등록</h1>
        <form
          id={ACCOUNT_FORM_ID}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col gap-4"
        >
          <TextField
            label="은행"
            placeholder="은행 입력(ex. 우리, 농협...)"
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
