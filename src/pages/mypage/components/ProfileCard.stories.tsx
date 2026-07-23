import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProfileCard } from "./ProfileCard";

const meta = {
  title: "Pages/Mypage/ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "centered",
  },
  args: {
    nickname: "피자피자 조아",
    dormitory: "1기숙사",
    mannerTemperature: 38.6,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithProfileImage: Story = {
  args: {
    profileImageUrl: "https://i.pravatar.cc/96?img=1",
  },
};
