import { useModalStore } from "@/stores/useModalStore";

import { Modal } from "./Modal";

export function GlobalModal() {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const modalProps = useModalStore((state) => state.modalProps);
  const callbacks = useModalStore((state) => state.callbacks);
  const closeModal = useModalStore((state) => state.closeModal);

  if (!modalProps) return null;

  const handleCancel = () => {
    const { onCancel } = callbacks;
    closeModal();
    onCancel?.();
  };

  const handleConfirm = () => {
    const { onConfirm } = callbacks;
    closeModal();
    onConfirm?.();
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
