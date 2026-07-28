import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { usePartyList } from "@/api/order/query";
import { getApiErrorMessage } from "@/api/error";
import { HomeHeader } from "@/components/header/HomeHeader";
import { TabBar } from "@/components/tabBar/TabBar";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import {
  ACCOUNT_UNREGISTERED_MODAL_PROPS,
  DORM_VERIFICATION_MODAL_PROPS,
  NOSHOW_RESTRICTION_MODAL_PROPS,
} from "@/constants/order/guardModals";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";
import { toOrderItem } from "@/utils/order/toOrderItem";

import { MyOrderSection } from "./components/MyOrderSection";
import { OrderListSection } from "./components/OrderListSection";
import { inProgressOrders, pastOrders, type OrderItem } from "./orderItem.mock";

const TABS = [
  { label: "배달팟 목록", value: "all" },
  { label: "내 배달팟", value: "mine" },
];

// TODO: 로그인 사용자의 실제 기숙사 인증 여부로 교체
const IS_DORM_VERIFIED = true;
// TODO: 로그인 사용자의 실제 노쇼 정지 상태로 교체
const IS_NOSHOW_RESTRICTED = false;
// TODO: 로그인 사용자의 실제 계좌 등록 여부로 교체
const IS_ACCOUNT_REGISTERED = true;

export default function HomePage() {
  const [tab, setTab] = useState(TABS[0].value);
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { openToast } = useToast();
  const { data: partyList, isPending, isError, error } = usePartyList();
  const recruitingOrders = (partyList ?? []).map(toOrderItem);

  useEffect(() => {
    if (!isError) return;
    openToast({
      message: getApiErrorMessage(error, API_ERROR_MESSAGE.ORDER_LIST),
    });
  }, [isError, error, openToast]);

  useEffect(() => {
    const matchedOrder = inProgressOrders.find(
      (order) => order.status === "matched"
    );
    if (!matchedOrder) return;

    openToast({
      message: "배달팟이 매칭되었습니다!",
      actionLabel: "채팅방 입장",
      onActionClick: () => {
        // TODO: 채팅방 페이지 구현 후 실제 이동으로 교체
      },
    });
  }, [openToast]);

  function handleCreateClick() {
    if (!IS_DORM_VERIFIED) {
      openModal({
        props: DORM_VERIFICATION_MODAL_PROPS,
        onConfirm: () => navigate(PATH.MYPAGE_DORMITORY),
      });
      return;
    }

    if (IS_NOSHOW_RESTRICTED) {
      openModal({ props: NOSHOW_RESTRICTION_MODAL_PROPS });
      return;
    }

    if (!IS_ACCOUNT_REGISTERED) {
      openModal({
        props: ACCOUNT_UNREGISTERED_MODAL_PROPS,
        onConfirm: () => navigate(PATH.MYPAGE_ACCOUNT),
      });
      return;
    }

    navigate(PATH.ORDER_CREATE);
  }

  function handleCardClick(order: OrderItem) {
    if (!IS_DORM_VERIFIED) {
      openModal({
        props: DORM_VERIFICATION_MODAL_PROPS,
        onConfirm: () => navigate(PATH.MYPAGE_DORMITORY),
      });
      return;
    }

    navigate(PATH.ORDER_DETAIL.replace(":orderId", order.id));
  }

  return (
    <PageShell header={<HomeHeader />}>
      <TabBar tabs={TABS} value={tab} onChange={setTab} />

      {tab === "mine" ? (
        <MyOrderSection
          inProgressOrders={inProgressOrders}
          pastOrders={pastOrders}
          onCreateClick={handleCreateClick}
          onCardClick={handleCardClick}
        />
      ) : isPending ? (
        <p className="px-5 py-6 text-body-1 text-text-4">불러오는 중...</p>
      ) : (
        <OrderListSection
          orders={recruitingOrders}
          onCreateClick={handleCreateClick}
          onCardClick={handleCardClick}
        />
      )}
    </PageShell>
  );
}
