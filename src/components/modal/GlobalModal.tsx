import { useModalStore } from "@/stores/useModalStore";

import { Modal } from "./Modal";

export function GlobalModal() {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const modalProps = useModalStore((state) => state.modalProps);
  const callbacks = useModalStore((state) => state.callbacks);
  const closeModal = useModalStore((state) => state.closeModal);

  if (!modalProps) return null;

  const handleCancel = () => {
    callbacks.onCancel?.();
    closeModal();
  };

  const handleConfirm = () => {
    callbacks.onConfirm?.();
    closeModal();
  };

  return (
    <Modal
      {...modalProps}
      isOpen={isModalOpen}
      onClose={handleCancel}
      onOutlineClick={handleCancel}
      onPrimaryClick={handleConfirm}
    />
  );
}
