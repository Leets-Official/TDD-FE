import hansik from "@/assets/foodCategories/hansik.png";
import jungsik from "@/assets/foodCategories/jungsik.png";
import fastFood from "@/assets/foodCategories/fastFood.png";
import cafeDessert from "@/assets/foodCategories/cafeDessert.png";
import chicken from "@/assets/foodCategories/chicken.png";
import bunsik from "@/assets/foodCategories/bunsik.png";
import japanese from "@/assets/foodCategories/japanese.png";
import pizza from "@/assets/foodCategories/pizza.png";
import western from "@/assets/foodCategories/western.png";
import jokbal from "@/assets/foodCategories/jokbal.png";
import etc from "@/assets/foodCategories/etc.png";

export type FoodCategory =
  | "한식"
  | "중식"
  | "패스트푸드"
  | "카페(디저트)"
  | "치킨"
  | "분식"
  | "일식(회,돈까스)"
  | "피자"
  | "양식"
  | "족발,보쌈"
  | "기타";

export const CATEGORY_ICONS: Record<FoodCategory, string> = {
  한식: hansik,
  중식: jungsik,
  패스트푸드: fastFood,
  "카페(디저트)": cafeDessert,
  치킨: chicken,
  분식: bunsik,
  "일식(회,돈까스)": japanese,
  피자: pizza,
  양식: western,
  "족발,보쌈": jokbal,
  기타: etc,
};
