import { useModalStore } from "@/stores/useModalStore";

export function useModal() {
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  return { openModal, closeModal };
}
