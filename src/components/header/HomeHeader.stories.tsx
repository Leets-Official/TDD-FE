import type { Meta, StoryObj } from "@storybook/react-vite";

import { MemoryRouter } from "react-router";

import { HomeHeader } from "./HomeHeader";

const meta = {
  title: "Components/HomeHeader",
  component: HomeHeader,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof HomeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
