import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/button/Button";
import { TextField } from "@/components/textField/TextField";
import { useCountdown } from "@/hooks/useCountdown";
import { emailVerifySchema, type EmailVerifyFormValues } from "@/schemas/auth";

const CODE_EXPIRY_MS = 3 * 60 * 1000;

export interface EmailVerifyFormProps {
  formId: string;
  onRequestCode: (email: string) => Promise<void> | void;
  onSubmit: (values: EmailVerifyFormValues) => void;
  onCodeValidityChange?: (isValid: boolean) => void;
}

export function EmailVerifyForm({
  formId,
  onRequestCode,
  onSubmit,
  onCodeValidityChange,
}: EmailVerifyFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    setFocus,
    control,
    trigger,
    formState: { errors },
  } = useForm<EmailVerifyFormValues>({
    resolver: zodResolver(emailVerifySchema),
  });

  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const { timeLabel, isExpired } = useCountdown(deadline);

  const emailValue = useWatch({ control, name: "email" });
  const codeValue = useWatch({ control, name: "code" });
  const isCodeSent = sentEmail !== null && emailValue === sentEmail;
  const isCodeComplete = (codeValue ?? "").length === 6;
  const isCodeExpired = isCodeSent && isExpired;

  useEffect(() => {
    onCodeValidityChange?.(isCodeSent && isCodeComplete && !isCodeExpired);
  }, [isCodeSent, isCodeComplete, isCodeExpired, onCodeValidityChange]);

  const handleRequestCode = async () => {
    if (isRequesting) return;

    const isValid = await trigger("email");
    if (!isValid) return;

    const email = getValues("email");
    setIsRequesting(true);
    try {
      await onRequestCode(email);
    } catch {
      // TODO: 발송 실패 문구 추후 api 연동 시 추가
      return;
    } finally {
      setIsRequesting(false);
    }

    resetField("code");
    setDeadline(Date.now() + CODE_EXPIRY_MS);
    setSentEmail(email);
    setFocus("code");
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col px-5 pt-l"
    >
      <h1 className="text-title-1 text-black">학교 이메일 인증</h1>
      <div className="mt-6 flex flex-col gap-[18px]">
        <TextField
          label="학교 이메일"
          placeholder="@.ac.kr"
          autoFocus
          state={errors.email ? "error" : "default"}
          feedback={errors.email?.message}
          rightElement={
            isCodeSent ? (
              <Button
                type="button"
                variant="outline"
                size="small"
                className="shrink-0"
                disabled={!emailValue || isRequesting}
                onClick={handleRequestCode}
              >
                재전송
              </Button>
            ) : (
              <Button
                type="button"
                size="small"
                className="shrink-0"
                disabled={!emailValue || isRequesting}
                onClick={handleRequestCode}
              >
                인증코드 받기
              </Button>
            )
          }
          {...register("email", {
            onChange: () => {
              if (sentEmail !== null) resetField("code");
            },
          })}
        />
        <TextField
          aria-label="인증코드"
          placeholder="인증코드(6자리) 입력"
          inputMode="numeric"
          maxLength={6}
          state={errors.code || isCodeExpired ? "error" : "default"}
          feedback={
            isCodeExpired
              ? "인증코드가 만료되었어요. 재전송 후 다시 입력해주세요"
              : errors.code?.message
          }
          rightElement={
            isCodeSent ? (
              <span className="shrink-0 text-body-1 text-error">
                {timeLabel}
              </span>
            ) : undefined
          }
          {...register("code", {
            onChange: (event) => {
              event.target.value = event.target.value.replace(/\D/g, "");
            },
          })}
        />
      </div>
    </form>
  );
}
