import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { TimeBadge, type TimeBadgeProps } from "./TimeBadge";

const meta = {
  title: "Components/Badge/TimeBadge",
  component: TimeBadge,
  parameters: {
    layout: "centered",
  },
  args: {
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
  },
} satisfies Meta<typeof TimeBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Urgent: Story = {
  args: {
    deadline: Date.now() + 32 * 1000,
  },
};

interface TimeBadgePlaygroundProps extends Omit<TimeBadgeProps, "deadline"> {
  secondsRemaining: number;
}

function TimeBadgePlayground({
  secondsRemaining,
  ...props
}: TimeBadgePlaygroundProps) {
  const [baseTime] = useState(() => Date.now());
  return <TimeBadge {...props} deadline={baseTime + secondsRemaining * 1000} />;
}

export const Playground: StoryObj<Meta<typeof TimeBadgePlayground>> = {
  argTypes: {
    secondsRemaining: {
      control: { type: "number" },
    },
  },
  args: {
    secondsRemaining: 90,
  },
  render: (args) => <TimeBadgePlayground {...args} />,
};
