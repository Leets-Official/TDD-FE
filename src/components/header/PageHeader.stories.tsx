import type { Meta, StoryObj } from "@storybook/react-vite";

import MenuIcon from "@/assets/icons/MenuIcon.svg?react";

import { PageHeader } from "./PageHeader";

const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Title",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBack: () => {},
    rightElement: <MenuIcon />,
  },
};

export const TitleOnly: Story = {};
