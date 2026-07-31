import type { FoodCategory } from "@/components/card/categoryIcons";

export const FOOD_CATEGORY_MAP: Record<number, FoodCategory> = {
  1: "한식",
  2: "중식",
  3: "패스트푸드",
  4: "카페(디저트)",
  5: "치킨",
  6: "분식",
  7: "일식(회,돈까스)",
  8: "피자",
  9: "양식",
  10: "족발,보쌈",
  11: "기타",
};

export const FOOD_CATEGORY_ID_MAP: Record<FoodCategory, number> =
  Object.fromEntries(
    Object.entries(FOOD_CATEGORY_MAP).map(([id, category]) => [
      category,
      Number(id),
    ])
  ) as Record<FoodCategory, number>;
