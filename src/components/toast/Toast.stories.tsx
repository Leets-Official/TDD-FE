import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toast } from "./Toast";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  args: {
    message: "배달팟 참여 신청이 완료되었습니다!",
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    message: "배달팟이 매칭되었습니다!",
    actionLabel: "채팅방 입장",
  },
};
