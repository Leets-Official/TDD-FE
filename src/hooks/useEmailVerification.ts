import { useEffect, useRef } from "react";

import { useSendEmailCode, useVerifyEmailCode } from "@/api/auth/query";
import { EMAIL_VERIFY_TOAST_MESSAGE } from "@/constants/errorMessage";
import { useToast } from "@/hooks/useToast";
import type { EmailVerifyFormValues } from "@/schemas/auth";
import type { EmailCodePurpose } from "@/types/auth/auth";

interface UseEmailVerificationOptions {
  purpose: EmailCodePurpose;
  onVerified: (email: string) => void;
}

export function useEmailVerification({
  purpose,
  onVerified,
}: UseEmailVerificationOptions) {
  const { openToast } = useToast();
  const { mutateAsync: sendCode } = useSendEmailCode();
  const { mutateAsync: verifyCode, isPending: isVerifying } =
    useVerifyEmailCode();

  // 요청 중 화면을 떠나면 뒤늦게 온 응답을 반영하지 않기 위한 플래그
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // 다시 던져야 폼이 만료 타이머를 시작하지 않습니다.
  const requestCode = async (email: string) => {
    try {
      await sendCode({ email, purpose });
    } catch (error) {
      if (isMountedRef.current) {
        openToast({
          variant: "warning",
          message: EMAIL_VERIFY_TOAST_MESSAGE.SEND_FAILED,
        });
      }

      throw error;
    }

    if (isMountedRef.current) {
      openToast({
        variant: "success",
        message: EMAIL_VERIFY_TOAST_MESSAGE.SEND_SUCCESS,
      });
    }
  };

  const submitCode = async (values: EmailVerifyFormValues) => {
    try {
      await verifyCode({ ...values, purpose });
    } catch {
      if (isMountedRef.current) {
        openToast({
          variant: "error",
          message: EMAIL_VERIFY_TOAST_MESSAGE.VERIFY_FAILED,
        });
      }

      return;
    }

    if (!isMountedRef.current) return;

    onVerified(values.email);
  };

  return { requestCode, submitCode, isVerifying };
}
