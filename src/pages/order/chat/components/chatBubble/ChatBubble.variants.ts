import { tv } from "@/utils/cn";

export const chatBubbleVariants = tv({
  slots: {
    profile: "flex items-start gap-xxs",
    textColumn: "flex flex-col items-start gap-1",
    nickname: "text-body-2 text-black",
    wrapper: "flex items-end gap-1",
    bubble:
      "flex max-w-[70%] shrink-0 items-center px-padding-m py-padding-xxs",
    message: "text-body-1 wrap-break-word",
    time: "shrink-0 text-caption-2 whitespace-nowrap text-text-4",
  },
  variants: {
    isMine: {
      true: {
        wrapper: "w-full justify-end",
        bubble: "rounded-tl-sm rounded-br-sm rounded-bl-sm bg-secondary",
        message: "text-text-1",
      },
      false: {
        bubble: "rounded-tr-sm rounded-br-sm rounded-bl-sm bg-bg-3",
        message: "text-black",
      },
    },
    // 프로필(아바타+닉네임)이 생략된 연속 메시지도 아바타 폭(48px)+gap(8px)만큼 들여써서 정렬을 맞춤
    continuation: {
      true: { wrapper: "pl-14" },
    },
  },
  defaultVariants: {
    isMine: false,
  },
});
