import { PageShell } from "@/layouts/PageShell";
import Logo from "@/assets/Logo.svg?react";
import { TextField } from "@/components/textField/TextField";
import { Button } from "@/components/button/Button";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/schemas/auth";
import { PATH } from "@/routes/paths";
import { useLogin } from "@/api/auth/query";
import { isAxiosError } from "axios";

const LOGIN_FAILED_MESSAGE = "로그인에 실패했어요. 잠시 후 다시 시도해주세요";

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // TODO: 임시 alert — 폼 하단 에러 메시지 또는 error 변형 토스트로 교체
  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onError: (error) => {
        const message = isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message
          : undefined;

        alert(message ?? LOGIN_FAILED_MESSAGE);
      },
    });
  };

  return (
    <PageShell>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex h-full w-full flex-col items-center justify-center px-5"
      >
        <Logo className="h-10 w-[75px]" />
        <div className="mt-[67px] flex w-full flex-col gap-6">
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
        <Button type="submit" disabled={isPending} className="mt-[58px] w-full">
          로그인
        </Button>
      </form>
    </PageShell>
  );
}
