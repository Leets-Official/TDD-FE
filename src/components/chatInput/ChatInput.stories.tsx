import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChatInput } from "./ChatInput";

const meta = {
  title: "Components/ChatInput",
  component: ChatInput,
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "메시지 입력",
    value: "",
    onChange: () => {},
  },
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    function DefaultChatInput() {
      const [value, setValue] = useState("");

      return (
        <div className="w-98.25">
          <ChatInput
            {...args}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onSend={() => setValue("")}
          />
        </div>
      );
    }

    return <DefaultChatInput />;
  },
};

export const Typing: Story = {
  render: (args) => (
    <div className="w-98.25">
      <ChatInput {...args} value="입력중인 메시지" onChange={() => {}} />
    </div>
  ),
};
