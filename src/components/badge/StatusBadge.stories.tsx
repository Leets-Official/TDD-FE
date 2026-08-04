import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatusBadge } from "./StatusBadge";

const meta = {
  title: "Components/Badge/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "모집중",
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recruiting: Story = {};

export const Closed: Story = {
  args: {
    status: "closed",
    children: "모집마감",
  },
};

export const Ordered: Story = {
  args: {
    status: "ordered",
    children: "주문완료",
  },
};

export const Arrived: Story = {
  args: {
    status: "arrived",
    children: "배달도착",
  },
};

export const Settled: Story = {
  args: {
    status: "settled",
    children: "정산완료",
  },
};

export const Cancelled: Story = {
  args: {
    status: "cancelled",
    children: "취소",
  },
};
