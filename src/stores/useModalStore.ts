import { create } from "zustand";

import type { ModalProps } from "@/components/modal/Modal";

// 모달에 표시될 내용
type ModalContentProps = Omit<
  ModalProps,
  "isOpen" | "onClose" | "onOutlineClick" | "onPrimaryClick"
>;

interface ModalCallbacks {
  onConfirm?: () => void;
  onCancel?: () => void;
}

// openModal() 호출 시 넘기는 전체 인자
interface OpenModalOptions extends ModalCallbacks {
  props: ModalContentProps;
}

interface ModalStore {
  isModalOpen: boolean;
  callbacks: ModalCallbacks;
  modalProps: ModalContentProps | undefined;
  openModal: (options: OpenModalOptions) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  callbacks: {},
  modalProps: undefined,

  openModal: ({ props, onConfirm, onCancel }) =>
    set({
      isModalOpen: true,
      callbacks: { onConfirm, onCancel },
      modalProps: props,
    }),

  closeModal: () =>
    set({ isModalOpen: false, callbacks: {}, modalProps: undefined }),
}));
