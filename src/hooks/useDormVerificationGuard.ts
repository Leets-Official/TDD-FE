import { useNavigate } from "react-router";

import { DORM_VERIFICATION_MODAL_PROPS } from "@/constants/order/guardModals";
import { useMe } from "@/hooks/useMe";
import { useModal } from "@/hooks/useModal";
import { PATH } from "@/routes/paths";

export function useDormVerificationGuard() {
  const { me, dormStatus } = useMe();
  const { openModal } = useModal();
  const navigate = useNavigate();

  // 인증 완료면 true, 아니면 상태별 안내 모달을 띄우고 false를 돌려줍니다
  function ensureDormVerified() {
    if (dormStatus === "APPROVED") return true;

    const status = dormStatus ?? "NOT_SUBMITTED";
    const props =
      DORM_VERIFICATION_MODAL_PROPS[status] ??
      DORM_VERIFICATION_MODAL_PROPS.NOT_SUBMITTED;

    openModal({
      props:
        status === "REJECTED" && me?.rejectReason
          ? { ...props, caption: `반려 사유: ${me.rejectReason}` }
          : props,
      onConfirm: props.primaryLabel
        ? () => navigate(PATH.MYPAGE_DORMITORY)
        : undefined,
    });

    return false;
  }

  return { ensureDormVerified };
}
