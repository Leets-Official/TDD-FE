import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "학교 이메일을 입력해주세요")
  .email("이메일을 다시 확인해주세요")
  .refine((value) => value.toLowerCase().endsWith(".ac.kr"), {
    message: "이메일을 다시 확인해주세요",
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
