import { useNavigate } from "react-router";

import {
  DORM_VERIFICATION_MODAL_PROPS,
  ME_FETCH_FAILED_MODAL_PROPS,
} from "@/constants/order/guardModals";
import { useMe } from "@/hooks/useMe";
import { useModal } from "@/hooks/useModal";
import { PATH } from "@/routes/paths";

export function useDormVerificationGuard() {
  const { me, dormStatus, isError, refetch } = useMe();
  const { openModal } = useModal();
  const navigate = useNavigate();

  // 인증 완료면 true, 아니면 상태별 안내 모달을 띄우고 false를 돌려줍니다
  function ensureDormVerified() {
    if (dormStatus === "APPROVED") return true;

    if (isError || dormStatus === undefined) {
      openModal({
        props: ME_FETCH_FAILED_MODAL_PROPS,
        onConfirm: () => {
          refetch();
        },
      });
      return false;
    }

    const props =
      DORM_VERIFICATION_MODAL_PROPS[dormStatus] ??
      DORM_VERIFICATION_MODAL_PROPS.NOT_SUBMITTED;

    openModal({
      props:
        dormStatus === "REJECTED" && me?.rejectReason
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
