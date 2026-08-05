import { useState } from "react";
import { PageHeader } from "@/components/header/PageHeader";
import { Button } from "@/components/button/Button";
import { EmailVerifyForm } from "@/components/auth/EmailVerifyForm";
import { PasswordForm } from "@/components/auth/PasswordForm";
import { PageShell } from "@/layouts/PageShell";
import { useToast } from "@/hooks/useToast";
import { useVerifiedEmail } from "@/hooks/useVerifiedEmail";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { usePasswordResetSubmit } from "@/pages/passwordReset/hooks/usePasswordResetSubmit";
import { VERIFIED_EMAIL_KEY } from "@/constants/storage";
import { useGoBack } from "@/hooks/useGoBack";
import { PATH } from "@/routes/paths";

const EMAIL_VERIFY_FORM_ID = "password-reset-email-verify-form";
const PASSWORD_FORM_ID = "password-reset-password-form";

type PasswordResetStep = "email" | "password";

export default function PasswordResetPage() {
  const goBack = useGoBack(PATH.LOGIN);
  const { openToast } = useToast();
  const { email, isVerified, markVerified, clearVerified } = useVerifiedEmail(
    VERIFIED_EMAIL_KEY.PASSWORD_RESET
  );
  const [step, setStep] = useState<PasswordResetStep>(
    isVerified ? "password" : "email"
  );
  const [isStepValid, setIsStepValid] = useState(false);

  const { requestCode, submitCode, isVerifying } = useEmailVerification({
    purpose: "RESET_PASSWORD",
    onVerified: (email) => {
      markVerified(email);
      openToast({ message: "학교 이메일 인증이 완료되었습니다!" });
      setIsStepValid(false);
      setStep("password");
    },
  });

  const { submitPassword, isPending } = usePasswordResetSubmit({
    email,
    onSuccess: clearVerified,
  });

  const handleBack = () => {
    clearVerified();
    goBack();
  };

  const stepConfig = {
    email: {
      formId: EMAIL_VERIFY_FORM_ID,
      buttonLabel: "인증",
      content: (
        <EmailVerifyForm
          formId={EMAIL_VERIFY_FORM_ID}
          onRequestCode={requestCode}
          onSubmit={submitCode}
          onCodeValidityChange={setIsStepValid}
        />
      ),
    },
    password: {
      formId: PASSWORD_FORM_ID,
      buttonLabel: "완료",
      content: (
        <PasswordForm
          formId={PASSWORD_FORM_ID}
          title="비밀번호 재설정"
          label="새 비밀번호"
          placeholder="새 비밀번호 입력"
          onSubmit={submitPassword}
          onValidityChange={setIsStepValid}
        />
      ),
    },
  } satisfies Record<PasswordResetStep, unknown>;

  const currentStep = stepConfig[step];

  return (
    <PageShell
      header={<PageHeader title="비밀번호 찾기" onBack={handleBack} />}
      bottom={
        <Button
          type="submit"
          form={currentStep.formId}
          className="w-full"
          disabled={!isStepValid || isPending || isVerifying}
        >
          {currentStep.buttonLabel}
        </Button>
      }
    >
      {currentStep.content}
    </PageShell>
  );
}
