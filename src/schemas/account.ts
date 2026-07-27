import { z } from "zod";

export const ACCOUNT_NUMBER_MIN_LENGTH = 8;
export const ACCOUNT_NUMBER_MAX_LENGTH = 20;

const ACCOUNT_NUMBER_MESSAGE = `계좌번호는 '-' 없이 숫자 ${ACCOUNT_NUMBER_MIN_LENGTH}~${ACCOUNT_NUMBER_MAX_LENGTH}자리로 입력해주세요`;

export const bankSchema = z
  .string()
  .trim()
  .min(1, "은행을 입력해주세요")
  .max(20, "은행명을 다시 확인해주세요");

export const accountNumberSchema = z
  .string()
  .trim()
  .min(1, "계좌번호를 입력해주세요")
  .regex(
    new RegExp(
      `^\\d{${ACCOUNT_NUMBER_MIN_LENGTH},${ACCOUNT_NUMBER_MAX_LENGTH}}$`
    ),
    ACCOUNT_NUMBER_MESSAGE
  );

export const accountHolderSchema = z
  .string()
  .trim()
  .min(1, "예금주를 입력해주세요")
  .max(20, "예금주를 다시 확인해주세요")
  .regex(/^[가-힣a-zA-Z\s]+$/, "예금주는 한글, 영문만 사용할 수 있습니다");

export const accountFormSchema = z.object({
  bank: bankSchema,
  accountNumber: accountNumberSchema,
  accountHolder: accountHolderSchema,
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
