import { useNavigate } from "react-router";

import { useBankAccount } from "@/api/user/query";
import {
  ACCOUNT_UNREGISTERED_MODAL_PROPS,
  NOSHOW_RESTRICTION_MODAL_PROPS,
} from "@/constants/order/guardModals";
import { useDormVerificationGuard } from "@/hooks/useDormVerificationGuard";
import { useMe } from "@/hooks/useMe";
import { useModal } from "@/hooks/useModal";
import { PATH } from "@/routes/paths";
import type { OrderItem } from "@/types/home/home";

// 배달팟 생성·상세 진입 전에 걸리는 가드(기숙사 인증·노쇼 제재·정산 계좌)를 모아둡니다
export function useHomeActions() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { isNoshowRestricted } = useMe();
  const { ensureDormVerified } = useDormVerificationGuard();
  const { data: bankAccount, isPending: isBankAccountPending } =
    useBankAccount();
  const isAccountRegistered = !!bankAccount;

  function handleCreateClick() {
    if (isBankAccountPending) return;

    if (!ensureDormVerified()) return;

    if (isNoshowRestricted) {
      openModal({ props: NOSHOW_RESTRICTION_MODAL_PROPS });
      return;
    }

    if (!isAccountRegistered) {
      openModal({
        props: ACCOUNT_UNREGISTERED_MODAL_PROPS,
        onConfirm: () => navigate(PATH.MYPAGE_ACCOUNT),
      });
      return;
    }

    navigate(PATH.ORDER_CREATE);
  }

  function handleCardClick(order: OrderItem) {
    if (!ensureDormVerified()) return;

    navigate(PATH.ORDER_DETAIL.replace(":orderId", order.id));
  }

  return { handleCreateClick, handleCardClick };
}
