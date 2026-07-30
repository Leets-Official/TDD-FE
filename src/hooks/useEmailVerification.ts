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

  // 다시 던져야 폼이 만료 타이머를 시작하지 않습니다.
  const requestCode = async (email: string) => {
    try {
      await sendCode({ email, purpose });
    } catch (error) {
      openToast({
        variant: "warning",
        message: EMAIL_VERIFY_TOAST_MESSAGE.SEND_FAILED,
      });

      throw error;
    }
  };

  const submitCode = async (values: EmailVerifyFormValues) => {
    try {
      await verifyCode({ ...values, purpose });
    } catch {
      openToast({
        variant: "error",
        message: EMAIL_VERIFY_TOAST_MESSAGE.VERIFY_FAILED,
      });

      return;
    }

    onVerified(values.email);
  };

  return { requestCode, submitCode, isVerifying };
}
