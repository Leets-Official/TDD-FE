import { tv } from "@/utils/cn";

export const chatBubbleVariants = tv({
  slots: {
    profile: "flex items-start gap-xxs",
    textColumn: "flex min-w-0 flex-1 flex-col items-start gap-1",
    nickname: "text-body-2 text-black",
    wrapper: "flex items-end gap-1",
    // 아주 작은 값으로 계산하는 문제가 있어 뷰포트 기준(vw)으로 대체
    bubble:
      "flex max-w-[70vw] shrink-0 items-center px-padding-m py-padding-xxs",
    message: "text-body-1 wrap-break-word",
    image: "size-40 shrink-0 rounded-sm object-cover",
    imageFallback:
      "flex size-40 shrink-0 items-center justify-center rounded-sm bg-bg-3",
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
