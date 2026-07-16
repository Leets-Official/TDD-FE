import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { createTV } from "tailwind-variants";

// tokens.css 커스텀 토큰 등록 (미등록 시 text-body-1 등이 색상으로 오인되어 병합 시 제거됨)
const twMergeConfig = {
  extend: {
    theme: {
      text: [
        "xxl",
        "xl",
        "l",
        "m",
        "s",
        "xs",
        "xxs",
        "title-1",
        "title-2",
        "label",
        "body-1",
        "body-2",
        "caption-1",
        "caption-2",
      ],
      "font-weight": ["sb", "m", "r"],
      leading: ["l", "m", "s"],
      spacing: [
        "xxl",
        "xl",
        "l",
        "m",
        "s",
        "xs",
        "xxs",
        "margin-l",
        "margin-m",
        "margin-s",
        "padding-l",
        "padding-m",
        "padding-s",
        "padding-xxs",
      ],
    },
  },
} as const;

const twMerge = extendTailwindMerge(twMergeConfig);

export const tv = createTV({ twMergeConfig });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type { VariantProps } from "tailwind-variants";
