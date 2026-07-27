import { useState } from "react";
import { PageHeader } from "@/components/header/PageHeader";
import { Button } from "@/components/button/Button";
import { EmailVerifyForm } from "@/components/auth/EmailVerifyForm";
import { PasswordForm } from "@/components/auth/PasswordForm";
import { PageShell } from "@/layouts/PageShell";
import { useToast } from "@/hooks/useToast";
import { useVerifiedEmail } from "@/hooks/useVerifiedEmail";
import { useNavigate } from "react-router";
import type { EmailVerifyFormValues, PasswordFormValues } from "@/schemas/auth";
import { PATH } from "@/routes/paths";

const EMAIL_VERIFY_FORM_ID = "password-reset-email-verify-form";
const PASSWORD_FORM_ID = "password-reset-password-form";

const VERIFIED_EMAIL_KEY = "password-reset-verified-email";

type PasswordResetStep = "email" | "password";

export default function PasswordResetPage() {
  const navigate = useNavigate();
  const { openToast } = useToast();
  const { isVerified, markVerified, clearVerified } =
    useVerifiedEmail(VERIFIED_EMAIL_KEY);
  const [step, setStep] = useState<PasswordResetStep>(
    isVerified ? "password" : "email"
  );
  const [isStepValid, setIsStepValid] = useState(false);

  const handleRequestCode = (_email: string) => {
    // TODO: 인증코드 발송 API 연동
  };

  const handleEmailSubmit = (values: EmailVerifyFormValues) => {
    // TODO: 인증코드 검증 API 연동
    markVerified(values.email);
    openToast({ message: "학교 이메일 인증이 완료되었습니다!" });
    setStep("password");
  };

  const handlePasswordSubmit = (_values: PasswordFormValues) => {
    // TODO: 비밀번호 재설정 API 연동
    clearVerified();
    navigate(PATH.LOGIN, { replace: true });
  };

  const handleBack = () => {
    // 인증을 마친 뒤에는 email 단계로 되돌리지 않고 페이지 나감
    clearVerified();
    navigate(-1);
  };

  const stepConfig = {
    email: {
      formId: EMAIL_VERIFY_FORM_ID,
      buttonLabel: "인증",
      content: (
        <EmailVerifyForm
          formId={EMAIL_VERIFY_FORM_ID}
          onRequestCode={handleRequestCode}
          onSubmit={handleEmailSubmit}
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
          onSubmit={handlePasswordSubmit}
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
          disabled={!isStepValid}
        >
          {currentStep.buttonLabel}
        </Button>
      }
    >
      {currentStep.content}
    </PageShell>
  );
}
