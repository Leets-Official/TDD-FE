import type { Meta, StoryObj } from "@storybook/react-vite";

import { RestrictionCard } from "./RestrictionCard";

const meta = {
  title: "Pages/Mypage/RestrictionCard",
  component: RestrictionCard,
  parameters: {
    layout: "centered",
  },
  args: {
    noShowApprovedCount: 3,
    suspendedUntil: "2026-07-31T23:59:59",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RestrictionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
