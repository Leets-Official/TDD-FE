import type { DropdownOption } from "@/components/dropdown/Dropdown";
import { DORMITORY_OPTIONS } from "@/constants/dormitory";
import {
  CATEGORY_ICONS,
  FOOD_CATEGORIES,
} from "@/components/card/categoryIcons";

export const DORM_OPTIONS: DropdownOption[] = [
  { label: "전체", value: "" },
  ...DORMITORY_OPTIONS,
];

export const MENU_OPTIONS: DropdownOption[] = [
  { label: "전체", value: "" },
  ...FOOD_CATEGORIES.map((category) => ({
    label: category,
    value: category,
    icon: (
      <img
        src={CATEGORY_ICONS[category]}
        alt=""
        className="size-6 rounded-xs"
      />
    ),
  })),
];

export const ORDER_TIME_OPTIONS: DropdownOption[] = [
  { label: "전체", value: "" },
  { label: "5분 후", value: "5" },
  { label: "10분 후", value: "10" },
  { label: "15분 후", value: "15" },
  { label: "20분 후", value: "20" },
  { label: "30분 후", value: "30" },
  { label: "40분 후", value: "40" },
  { label: "50분 후", value: "50" },
];

export const POD_STATE_OPTIONS: DropdownOption[] = [
  { label: "전체", value: "all" },
  { label: "진행중", value: "ongoing" },
  { label: "지난", value: "past" },
];
