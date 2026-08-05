import { useState } from "react";
import { PageHeader } from "@/components/header/PageHeader";
import { Button } from "@/components/button/Button";
import { EmailVerifyForm } from "@/components/auth/EmailVerifyForm";
import { PasswordForm } from "@/components/auth/PasswordForm";
import { ProfileForm } from "@/components/auth/ProfileForm";
import { PageShell } from "@/layouts/PageShell";
import { useToast } from "@/hooks/useToast";
import { useVerifiedEmail } from "@/hooks/useVerifiedEmail";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import type { PasswordFormValues } from "@/schemas/auth";
import { useSignupSubmit } from "@/pages/signup/hooks/useSignupSubmit";
import { VERIFIED_EMAIL_KEY } from "@/constants/storage";
import { EMAIL_VERIFY_TOAST_MESSAGE } from "@/constants/toastMessage";
import { useGoBack } from "@/hooks/useGoBack";
import { PATH } from "@/routes/paths";

const EMAIL_VERIFY_FORM_ID = "signup-email-verify-form";
const PASSWORD_FORM_ID = "signup-password-form";
const PROFILE_FORM_ID = "signup-profile-form";

type SignupStep = "email" | "password" | "profile";

export default function SignupPage() {
  const goBack = useGoBack(PATH.LOGIN);
  const { openToast } = useToast();
  const { email, isVerified, markVerified, clearVerified } = useVerifiedEmail(
    VERIFIED_EMAIL_KEY.SIGNUP
  );
  const [step, setStep] = useState<SignupStep>(
    isVerified ? "password" : "email"
  );
  const [isStepValid, setIsStepValid] = useState(false);
  const [password, setPassword] = useState("");

  const goToStep = (next: SignupStep) => {
    setIsStepValid(false);
    setStep(next);
  };

  const { requestCode, submitCode, isVerifying } = useEmailVerification({
    purpose: "SIGNUP",
    onVerified: (email) => {
      markVerified(email);
      openToast({ message: EMAIL_VERIFY_TOAST_MESSAGE.VERIFY_SUCCESS });
      goToStep("password");
    },
  });

  const handlePasswordSubmit = (values: PasswordFormValues) => {
    setPassword(values.password);
    goToStep("profile");
  };

  const { submitSignup, isPending } = useSignupSubmit({
    email,
    password,
    onSuccess: clearVerified,
  });

  const handleBack = () => {
    if (step === "profile") {
      goToStep("password");
      return;
    }
    // 인증을 마친 뒤에는 email 단계로 되돌리지 않고 페이지 나감
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
                disabled={isPending}
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
