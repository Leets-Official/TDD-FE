import type { DropdownOption } from "@/components/dropdown/Dropdown";

export const DORMITORY_VALUES = ["1기숙사", "2기숙사", "3기숙사"] as const;

export type DormitoryValue = (typeof DORMITORY_VALUES)[number];

export const DORMITORY_OPTIONS: DropdownOption[] = DORMITORY_VALUES.map(
  (value) => ({ label: value, value })
);
