import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/button/Button";

import { Modal } from "./Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  args: {
    isOpen: true,
    onClose: () => {},
    title: "참여를 위해서는 계좌등록이 필요합니다",
    description: "계좌를 등록하시겠습니까?",
    caption: "계좌를 등록하시겠습니까?",
    outlineLabel: "취소",
    primaryLabel: "등록하기",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    function ModalDemo() {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
          <Modal
            {...args}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onOutlineClick={() => setIsOpen(false)}
            onPrimaryClick={() => setIsOpen(false)}
          />
        </>
      );
    }

    return <ModalDemo />;
  },
};

export const WithoutCaption: Story = {
  ...Default,
  args: {
    ...meta.args,
    caption: undefined,
  },
};

export const WithoutDescription: Story = {
  ...Default,
  args: {
    ...meta.args,
    description: undefined,
  },
};

export const PrimaryOnly: Story = {
  ...Default,
  args: {
    ...meta.args,
    outlineLabel: undefined,
  },
};

export const OutlineOnly: Story = {
  ...Default,
  args: {
    ...meta.args,
    primaryLabel: undefined,
  },
};
