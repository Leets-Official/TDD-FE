import { useState } from "react";
import { PageHeader } from "@/components/header/PageHeader";
import { Button } from "@/components/button/Button";
import { EmailVerifyForm } from "@/components/auth/EmailVerifyForm";
import { PasswordForm } from "@/components/auth/PasswordForm";
import { ProfileForm } from "@/pages/signup/components/ProfileForm";
import { PageShell } from "@/layouts/PageShell";
import { useToast } from "@/hooks/useToast";
import { useVerifiedEmail } from "@/hooks/useVerifiedEmail";
import { useNavigate } from "react-router";
import type { EmailVerifyFormValues, PasswordFormValues } from "@/schemas/auth";
import { PATH } from "@/routes/paths";

const EMAIL_VERIFY_FORM_ID = "signup-email-verify-form";
const PASSWORD_FORM_ID = "signup-password-form";
const PROFILE_FORM_ID = "signup-profile-form";

const VERIFIED_EMAIL_KEY = "signup-verified-email";

type SignupStep = "email" | "password" | "profile";

export default function SignupPage() {
  const navigate = useNavigate();
  const { openToast } = useToast();
  const { isVerified, markVerified, clearVerified } =
    useVerifiedEmail(VERIFIED_EMAIL_KEY);
  const [step, setStep] = useState<SignupStep>(
    isVerified ? "password" : "email"
  );
  const [isStepValid, setIsStepValid] = useState(false);
  const [password, setPassword] = useState("");

  const handleRequestCode = (_email: string) => {
    // TODO: 인증코드 발송 API 연동
  };

  const handleEmailSubmit = (values: EmailVerifyFormValues) => {
    // TODO: 인증코드 검증 API 연동
    markVerified(values.email);
    openToast({ message: "학교 이메일 인증이 완료되었습니다!" });
    setStep("password");
  };

  const handlePasswordSubmit = (values: PasswordFormValues) => {
    setPassword(values.password);
    setStep("profile");
  };

  const submitSignup = (_profile: {
    nickname: string | null;
    dormitory: string | null;
  }) => {
    // TODO: 회원가입 API 연동
    clearVerified();
    navigate(PATH.LOGIN, { replace: true });
  };

  const handleBack = () => {
    if (step === "profile") {
      setStep("password");
      return;
    }
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
      buttonLabel: "다음",
      content: (
        <PasswordForm
          formId={PASSWORD_FORM_ID}
          title="비밀번호 설정"
          defaultValue={password}
          onSubmit={handlePasswordSubmit}
          onValidityChange={setIsStepValid}
        />
      ),
    },
    profile: {
      formId: PROFILE_FORM_ID,
      buttonLabel: "완료",
      content: (
        <ProfileForm
          formId={PROFILE_FORM_ID}
          onSubmit={submitSignup}
          onValidityChange={setIsStepValid}
        />
      ),
    },
  } satisfies Record<SignupStep, unknown>;

  const currentStep = stepConfig[step];

  return (
    <PageShell
      header={
        <PageHeader
          title="회원가입"
          onBack={handleBack}
          rightElement={
            step === "profile" && (
              <Button
                variant="text"
                size="small"
                onClick={() =>
                  submitSignup({ nickname: null, dormitory: null })
                }
              >
                건너뛰기
              </Button>
            )
          }
        />
      }
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
