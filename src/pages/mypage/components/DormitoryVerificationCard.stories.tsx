import type { Meta, StoryObj } from "@storybook/react-vite";

import { DormitoryVerificationCard } from "./DormitoryVerificationCard";

const meta = {
  title: "Pages/MyPage/DormitoryVerificationCard",
  component: DormitoryVerificationCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DormitoryVerificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const None: Story = {
  args: {
    status: "NONE",
  },
};

export const Pending: Story = {
  args: {
    status: "PENDING",
  },
};

export const Approved: Story = {
  args: {
    status: "APPROVED",
    verifiedUntil: new Date(
      Date.now() + 12 * 24 * 60 * 60 * 1000
    ).toISOString(),
  },
};

export const Rejected: Story = {
  args: {
    status: "REJECTED",
    rejectReason:
      "서류가 흐릿하거나 정보를 확인할 수 없어요. 재인증이 필요해요",
  },
};

export const Expired: Story = {
  args: {
    status: "EXPIRED",
  },
};
