import type { Meta, StoryObj } from "@storybook/react-vite";

import { TabBar } from "./TabBar";

const meta = {
  title: "Components/TabBar",
  component: TabBar,
  parameters: {
    layout: "centered",
  },
  args: {
    tabs: [
      { label: "탭", value: "tab1" },
      { label: "탭", value: "tab2" },
      { label: "탭", value: "tab3" },
    ],
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoTabs: Story = {
  args: {
    tabs: [
      { label: "진행 중", value: "ongoing" },
      { label: "완료", value: "done" },
    ],
  },
};
