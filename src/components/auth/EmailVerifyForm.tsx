import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/button/Button";
import { TextField } from "@/components/textField/TextField";
import { useCountdown } from "@/hooks/useCountdown";
import {
  emailVerifySchema,
  normalizeEmail,
  type EmailVerifyFormValues,
} from "@/schemas/auth";

const CODE_EXPIRY_MS = 5 * 60 * 1000;

const SPAM_NOTICE = "메일이 안 보이면 스팸함을 확인해주세요";

export interface EmailVerifyFormProps {
  formId: string;
  onRequestCode: (email: string) => Promise<void> | void;
  onSubmit: (values: EmailVerifyFormValues) => Promise<void> | void;
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
  const isCodeSent =
    sentEmail !== null && normalizeEmail(emailValue ?? "") === sentEmail;
  const isCodeComplete = (codeValue ?? "").length === 6;
  const isCodeExpired = isCodeSent && isExpired;

  const emailFeedback =
    errors.email?.message ?? (isCodeSent ? SPAM_NOTICE : undefined);

  useEffect(() => {
    onCodeValidityChange?.(isCodeSent && isCodeComplete && !isCodeExpired);
  }, [isCodeSent, isCodeComplete, isCodeExpired, onCodeValidityChange]);

  const handleRequestCode = async () => {
    if (isRequesting) return;

    const isValid = await trigger("email");
    if (!isValid) return;

    const email = normalizeEmail(getValues("email"));
    setIsRequesting(true);
    try {
      await onRequestCode(email);
    } catch {
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
          feedback={emailFeedback}
          rightElement={
            <Button
              type="button"
              variant={isCodeSent ? "outline" : "default"}
              size="small"
              className="shrink-0"
              disabled={!emailValue || isRequesting}
              onClick={handleRequestCode}
            >
              {isRequesting
                ? "전송 중"
                : isCodeSent
                  ? "재전송"
                  : "인증코드 받기"}
            </Button>
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
