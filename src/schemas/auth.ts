import { z } from "zod";

import { DORMITORY_VALUES } from "@/constants/dormitory";

export const emailSchema = z
  .string()
  .min(1, "이메일을 다시 확인해주세요")
  .pipe(z.email("이메일을 다시 확인해주세요"))
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

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요"),
    newPassword: passwordSchema,
  })
  .refine((values) => values.currentPassword !== values.newPassword, {
    message: "현재 비밀번호와 다른 비밀번호를 입력해주세요",
    path: ["newPassword"],
  });

export type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

// 본인 확인용. 기존 비밀번호가 현재 규칙을 만족하지 않을 수 있어 형식은 검사하지 않음
export const passwordConfirmSchema = z.object({
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export type PasswordConfirmFormValues = z.infer<typeof passwordConfirmSchema>;

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
  // 건너뛰거나 선택하지 않으면 null입니다.
  dormitory: z
    .enum(DORMITORY_VALUES, { error: "기숙사를 다시 선택해주세요" })
    .nullable(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
