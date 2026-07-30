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

export const Warning: Story = {
  args: {
    variant: "warning",
    message:
      "학교 이메일 인증에 실패하였습니다!\n다시 시도해주세요(5분내 3회 재시도 가능)",
  },
};

export const ErrorVariant: Story = {
  name: "Error",
  args: {
    variant: "error",
    message: "학교 이메일 인증에 실패하였습니다!",
  },
};
