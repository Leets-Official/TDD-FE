import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField } from "@/components/textField/TextField";
import {
  passwordFormSchema,
  PASSWORD_HINT,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  type PasswordFormValues,
} from "@/schemas/auth";

export interface PasswordFormProps {
  formId: string;
  title: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onSubmit: (values: PasswordFormValues) => void;
  onValidityChange?: (isValid: boolean) => void;
}

export function PasswordForm({
  formId,
  title,
  label = "비밀번호",
  placeholder = "비밀번호 입력",
  defaultValue = "",
  onSubmit,
  onValidityChange,
}: PasswordFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { password: defaultValue },
  });

  const passwordValue = useWatch({ control, name: "password" });
  const passwordLength = (passwordValue ?? "").length;
  const isPasswordValid =
    passwordLength >= PASSWORD_MIN_LENGTH &&
    passwordLength <= PASSWORD_MAX_LENGTH;

  useEffect(() => {
    onValidityChange?.(isPasswordValid);
  }, [isPasswordValid, onValidityChange]);

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col px-5 pt-l"
    >
      <h1 className="text-title-1 text-black">{title}</h1>
      <div className="mt-6 flex flex-col gap-[18px]">
        <TextField
          label={label}
          type="password"
          placeholder={placeholder}
          autoFocus
          state={errors.password ? "error" : "default"}
          feedback={errors.password?.message ?? PASSWORD_HINT}
          {...register("password")}
        />
      </div>
    </form>
  );
}
