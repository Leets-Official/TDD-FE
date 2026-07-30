import { AuthIntroShell } from "@/layouts/AuthIntroShell";
import { TextField } from "@/components/textField/TextField";
import { Button } from "@/components/button/Button";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/schemas/auth";
import { PATH } from "@/routes/paths";
import { useLogin } from "@/api/auth/query";
import { getApiErrorMessage, getApiFieldErrors } from "@/api/error";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";

const LOGIN_FORM_ID = "login-form";

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // TODO: 임시 alert — error 변형 토스트로 교체
  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onError: (error) => {
        const fieldErrors = getApiFieldErrors(error);
        const invalidFields = (
          Object.keys(values) as (keyof LoginFormValues)[]
        ).filter((field) => fieldErrors[field]);

        if (invalidFields.length > 0) {
          invalidFields.forEach((field) =>
            setError(field, { message: fieldErrors[field] })
          );

          return;
        }

        alert(getApiErrorMessage(error, API_ERROR_MESSAGE.LOGIN));
      },
    });
  };

  return (
    <AuthIntroShell
      action={
        <Button
          type="submit"
          form={LOGIN_FORM_ID}
          disabled={isPending}
          className="w-full"
        >
          로그인
        </Button>
      }
    >
      <form
        id={LOGIN_FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-[67px] flex w-full flex-col"
      >
        <div className="flex w-full flex-col gap-6">
          <TextField
            label="아이디"
            placeholder="학교 이메일 입력(.ac.kr)"
            state={errors.email ? "error" : "default"}
            feedback={errors.email?.message}
            {...register("email")}
          />
          <TextField
            label="비밀번호"
            placeholder="비밀번호 입력"
            type="password"
            state={errors.password ? "error" : "default"}
            feedback={errors.password?.message}
            {...register("password")}
          />
        </div>
        <div className="mt-2 flex w-full justify-between">
          <Button
            variant="text"
            size="small"
            className="text-text-4"
            onClick={() => navigate(PATH.PASSWORD_RESET)}
          >
            비밀번호 찾기
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => navigate(PATH.SIGNUP)}
          >
            학교 이메일로 회원가입
          </Button>
        </div>
      </form>
    </AuthIntroShell>
  );
}
