import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { useCountdown } from "@/hooks/useCountdown";

import { TimeBadge } from "./TimeBadge";

interface TimeBadgeDemoProps {
  deadline: number;
  urgentThresholdMs?: number;
}

function TimeBadgeDemo({ deadline, urgentThresholdMs }: TimeBadgeDemoProps) {
  const { timeLabel, isUrgent, isExpired } = useCountdown(deadline, {
    urgentThresholdMs,
  });

  return (
    <TimeBadge
      timeLabel={timeLabel}
      isUrgent={isUrgent}
      isExpired={isExpired}
    />
  );
}

const meta = {
  title: "Components/Badge/TimeBadge",
  component: TimeBadgeDemo,
  parameters: {
    layout: "centered",
  },
  args: {
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
  },
} satisfies Meta<typeof TimeBadgeDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Urgent: Story = {
  args: {
    deadline: Date.now() + 32 * 1000,
  },
};

interface TimeBadgePlaygroundProps extends Omit<
  TimeBadgeDemoProps,
  "deadline"
> {
  secondsRemaining: number;
}

function TimeBadgePlayground({
  secondsRemaining,
  ...props
}: TimeBadgePlaygroundProps) {
  const [deadline] = useState(() => Date.now() + secondsRemaining * 1000);

  return <TimeBadgeDemo {...props} deadline={deadline} />;
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
  // secondsRemaining이 바뀔 때마다 새로 마운트되어 deadline을 현재 시각 기준으로 다시 계산
  render: (args) => (
    <TimeBadgePlayground key={args.secondsRemaining} {...args} />
  ),
};
