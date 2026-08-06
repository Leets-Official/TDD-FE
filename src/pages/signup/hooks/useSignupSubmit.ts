import { getApiErrorMessage } from "@/api/error";
import { useSignup } from "@/api/user/query";
import { AUTH_ERROR_MESSAGE } from "@/constants/errorMessage/auth";
import { useToast } from "@/hooks/useToast";
import type { ProfileFormValues } from "@/schemas/auth";

export interface SignupProfile {
  nickname: ProfileFormValues["nickname"] | null;
  dormitory: ProfileFormValues["dormitory"];
}

interface UseSignupSubmitOptions {
  email: string;
  password: string;
  onSuccess: () => void;
}

export function useSignupSubmit({
  email,
  password,
  onSuccess,
}: UseSignupSubmitOptions) {
  const { openToast } = useToast();
  const { mutate: signup, isPending } = useSignup();

  const submitSignup = (profile: SignupProfile) => {
    signup(
      {
        email,
        password,
        nickname: profile.nickname ?? undefined,
        dormitory: profile.dormitory ?? undefined,
      },
      {
        onSuccess,
        onError: (error) => {
          openToast({
            variant: "error",
            message: getApiErrorMessage(error, AUTH_ERROR_MESSAGE.SIGNUP),
          });
        },
      }
    );
  };

  return { submitSignup, isPending };
}
