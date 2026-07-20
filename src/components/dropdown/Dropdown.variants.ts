import { tv } from "@/utils/cn";

export const dropdownVariants = tv({
  slots: {
    root: "relative inline-flex flex-col gap-xxs",
    label: "text-body-1 text-text-1",
    trigger:
      "inline-flex w-full cursor-pointer appearance-none items-center justify-between border border-text-5 bg-bg-1 text-left text-text-1 transition-colors disabled:cursor-not-allowed disabled:border-text-5 disabled:bg-bg-3 disabled:text-disabled [&_svg]:shrink-0 [&_svg]:text-text-1 [&_svg]:transition-transform",
    triggerText: "truncate",
    // Windows Chrome's native "Fluent" scrollbar can still render step buttons here regardless of ::-webkit-scrollbar-button rules; accepted as a known limitation.
    // position/top/left/width는 Dropdown.tsx에서 트리거 위치를 계산해 인라인 style로 지정합니다
    // (document.body에 포탈로 렌더링되어, overflow가 걸린 조상 안에 있어도 잘리지 않도록).
    panel:
      "z-10 w-full [scrollbar-width:thin] [scrollbar-color:var(--color-scrollbar-thumb)_transparent] overflow-y-auto rounded-sm bg-bg-1 [color-scheme:light] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.10)] [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-button]:size-0 [&::-webkit-scrollbar-button:vertical:end]:hidden [&::-webkit-scrollbar-button:vertical:end]:size-0 [&::-webkit-scrollbar-button:vertical:start]:hidden [&::-webkit-scrollbar-button:vertical:start]:size-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb [&::-webkit-scrollbar-track]:bg-transparent",
    option:
      "flex cursor-pointer items-center text-text-1 transition-colors hover:bg-secondary-hover focus:bg-secondary-hover focus:outline-none data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-disabled data-[selected=true]:bg-secondary-pressed",
  },
  variants: {
    variant: {
      select: {
        root: "w-full",
        trigger:
          "min-w-[349px] gap-xxs rounded-md px-padding-l py-l text-body-1",
        panel: "[&::-webkit-scrollbar]:w-3",
        option: "px-padding-l py-l text-body-1",
      },
      filter: {
        root: "w-fit",
        trigger:
          "w-fit gap-1 rounded-lg px-padding-m py-s text-body-2 [&_svg]:size-4",
        panel: "w-max min-w-[140px] [&::-webkit-scrollbar]:w-2",
        option: "px-padding-l py-s text-body-1",
      },
    },
    open: {
      true: {
        trigger: "[&_svg]:rotate-180",
      },
    },
    filled: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variant: "select",
      filled: false,
      class: { triggerText: "text-text-5" },
    },
    {
      variant: "filter",
      filled: true,
      class: { trigger: "bg-secondary-hover" },
    },
    {
      variant: "select",
      open: true,
      class: { trigger: "bg-bg-2" },
    },
    {
      variant: "filter",
      open: true,
      class: { trigger: "bg-bg-3" },
    },
  ],
  defaultVariants: {
    variant: "select",
  },
});
