import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActionDeliveryBubble } from "./ActionDeliveryBubble";

const meta = {
  title: "ChatComponents/ActionDeliveryBubble",
  component: ActionDeliveryBubble,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ActionDeliveryBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Arrived: Story = {
  args: {
    title: "배달이 도착했어요!",
    description: "방장님이 배달이 도착했음을 알립니다",
  },
};

export const Cancelled: Story = {
  args: {
    title: "배달 도착취소",
    description: "방장님이 배달 도착을 취소했어요",
  },
};

export const WithButton: Story = {
  args: {
    title: "정산을 완료하셨나요?",
    description: "정산을 완료하고 배달팟 후기를 남겨봐요!",
    buttonLabel: "정산 완료",
  },
};
