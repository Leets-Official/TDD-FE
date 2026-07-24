import { z } from "zod";

import { FOOD_CATEGORIES } from "@/components/card/categoryIcons";

export const TARGET_COUNT_MIN = 2;
export const TARGET_COUNT_MAX = 4;

export const orderCreateSchema = z.object({
  category: z.enum(FOOD_CATEGORIES, "카테고리를 선택해주세요"),
  title: z.string().trim().min(1, "제목을 입력해주세요"),
  targetRange: z.tuple([
    z.number().min(TARGET_COUNT_MIN),
    z.number().max(TARGET_COUNT_MAX),
  ]),
  orderTimeMinutes: z.string().min(1, "주문 예정 시간을 선택해주세요"),
  dormitory: z.string().min(1, "기숙사를 선택해주세요"),
  description: z.string().trim().min(1, "상세설명을 입력해주세요"),
});

export type OrderCreateFormValues = z.infer<typeof orderCreateSchema>;
