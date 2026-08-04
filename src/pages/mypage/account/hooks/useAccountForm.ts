import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

import { getApiErrorMessage } from "@/api/error";
import {
  useBankAccount,
  useRegisterBankAccount,
  useUpdateBankAccount,
} from "@/api/user/query";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import { useToast } from "@/hooks/useToast";
import { accountFormSchema, type AccountFormValues } from "@/schemas/account";

const ACCOUNT_REGISTER_SUCCESS_MESSAGE = "계좌가 등록되었습니다!";
const ACCOUNT_UPDATE_SUCCESS_MESSAGE = "계좌가 수정되었습니다!";

export function useAccountForm() {
  const navigate = useNavigate();
  const { openToast } = useToast();
  const { data: account, isPending: isLoading } = useBankAccount();
  const { mutate: registerAccount, isPending: isRegistering } =
    useRegisterBankAccount();
  const { mutate: updateAccount, isPending: isUpdating } =
    useUpdateBankAccount();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onSubmit",
    defaultValues: { bank: "", accountNumber: "", accountHolder: "" },
    values: account
      ? {
          bank: account.bankName,
          accountNumber: account.accountNumber,
          accountHolder: account.accountHolder,
        }
      : undefined,
    resetOptions: { keepDirtyValues: true },
  });

  const [bank, accountNumber, accountHolder] = useWatch({
    control,
    name: ["bank", "accountNumber", "accountHolder"],
  });
  const hasEmptyField = !bank || !accountNumber || !accountHolder;

  const accountNumberField = register("accountNumber");

  const handleAccountNumberFocus = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    if (!event.target.value.includes("*")) return;

    event.target.value = "";
    accountNumberField.onChange(event);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value = event.target.value.replace(/\D/g, "");
    accountNumberField.onChange(event);
  };

  const submitAccount = handleSubmit((values) => {
    const body = {
      bankName: values.bank,
      accountNumber: values.accountNumber,
      accountHolder: values.accountHolder,
    };

    const save = account ? updateAccount : registerAccount;
    const successMessage = account
      ? ACCOUNT_UPDATE_SUCCESS_MESSAGE
      : ACCOUNT_REGISTER_SUCCESS_MESSAGE;

    save(body, {
      onSuccess: () => {
        navigate(-1);
        openToast({ message: successMessage });
      },
      onError: (error) => {
        openToast({
          variant: "error",
          message: getApiErrorMessage(error, API_ERROR_MESSAGE.ACCOUNT_SAVE),
        });
      },
    });
  });

  return {
    register,
    errors,
    accountNumberField,
    handleAccountNumberFocus,
    handleAccountNumberChange,
    hasEmptyField,
    isLoading,
    isSubmitting: isRegistering || isUpdating,
    submitAccount,
  };
}
