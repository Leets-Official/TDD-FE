import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "이메일을 다시 확인해주세요")
  .email("이메일을 다시 확인해주세요")
  .refine((value) => value.toLowerCase().endsWith(".ac.kr"), {
    message: "학교 이메일을 입력해주세요",
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const verificationCodeSchema = z
  .string()
  .regex(/^\d{6}$/, "인증코드 6자리 숫자를 입력해주세요");

export const emailVerifySchema = z.object({
  email: emailSchema,
  code: verificationCodeSchema,
});

export type EmailVerifyFormValues = z.infer<typeof emailVerifySchema>;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 20;

export const PASSWORD_HINT = `${PASSWORD_MIN_LENGTH}~${PASSWORD_MAX_LENGTH}자의 영문, 숫자, 특수문자를 조합해 입력해주세요`;

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, PASSWORD_HINT)
  .max(PASSWORD_MAX_LENGTH, PASSWORD_HINT)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])/, PASSWORD_HINT);

export const passwordFormSchema = z.object({
  password: passwordSchema,
});

export type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export const NICKNAME_MIN_LENGTH = 2;
export const NICKNAME_MAX_LENGTH = 10;

const NICKNAME_LENGTH_MESSAGE = `닉네임은 ${NICKNAME_MIN_LENGTH}~${NICKNAME_MAX_LENGTH}자로 입력해주세요`;

export const nicknameSchema = z
  .string()
  .min(NICKNAME_MIN_LENGTH, NICKNAME_LENGTH_MESSAGE)
  .max(NICKNAME_MAX_LENGTH, NICKNAME_LENGTH_MESSAGE)
  .regex(
    /^[가-힣a-zA-Z0-9]+$/,
    "닉네임은 한글, 영문, 숫자만 사용할 수 있습니다."
  );

export const profileFormSchema = z.object({
  nickname: nicknameSchema,
  dormitory: z.string().nullable(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
