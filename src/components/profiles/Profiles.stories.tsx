import type { Meta, StoryObj } from "@storybook/react-vite";

import { Profiles, type ProfilesItem } from "./Profiles";

const participants: ProfilesItem[] = [
  {
    id: "1",
    nickname: "피자조아",
    temperature: 38.6,
    src: "https://i.pravatar.cc/112?img=1",
  },
  { id: "2", nickname: "배달왕", temperature: 41.2 },
  { id: "3", nickname: "치킨러버", temperature: 36.5 },
  {
    id: "4",
    nickname: "야식요정",
    temperature: 39.1,
    src: "https://i.pravatar.cc/112?img=4",
  },
];

const meta = {
  title: "Components/Profiles",
  component: Profiles,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="flex h-dvh items-center justify-center">
        <Story />
      </div>
    ),
  ],
  args: {
    maxCount: 4,
  },
} satisfies Meta<typeof Profiles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    participants: participants.slice(0, 3),
  },
};

export const Full: Story = {
  args: {
    participants,
  },
};

export const OneParticipant: Story = {
  args: {
    participants: participants.slice(0, 1),
  },
};
