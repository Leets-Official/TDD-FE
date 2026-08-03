import { useEffect, useRef, useState } from "react";
import { generatePath, useNavigate } from "react-router";

import { useMyPartyList, usePartyList } from "@/api/order/query";
import { getApiErrorMessage } from "@/api/error";
import type { PartyListItem } from "@/types/order/order";
import type { FoodCategory } from "@/components/card/categoryIcons";
import { HomeHeader } from "@/components/header/HomeHeader";
import { TabBar } from "@/components/tabBar/TabBar";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import {
  ACCOUNT_UNREGISTERED_MODAL_PROPS,
  DORM_VERIFICATION_MODAL_PROPS,
  NOSHOW_RESTRICTION_MODAL_PROPS,
} from "@/constants/order/guardModals";
import { FOOD_CATEGORY_ID_MAP } from "@/constants/order/foodCategory";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";
import {
  isPartyAutoCancelled,
  toMyOrderItem,
} from "@/utils/order/toMyOrderItem";
import { toOrderItem } from "@/utils/order/toOrderItem";

import { MyOrderSection } from "./components/MyOrderSection";
import { OrderListSection } from "./components/OrderListSection";
import type { OrderItem } from "@/types/home/home";

const TABS = [
  { label: "배달팟 목록", value: "all" },
  { label: "내 배달팟", value: "mine" },
];

// 진행중(ONGOING) 정책: RECRUITING·CLOSED·ORDERED / 그 외는 지난 배달팟(COMPLETED)
const ONGOING_STATUSES = new Set(["RECRUITING", "CLOSED", "ORDERED"]);

// TODO: 로그인 사용자의 실제 기숙사 인증 여부로 교체
const IS_DORM_VERIFIED = true;
// TODO: 로그인 사용자의 실제 노쇼 정지 상태로 교체
const IS_NOSHOW_RESTRICTED = false;
// TODO: 로그인 사용자의 실제 계좌 등록 여부로 교체
const IS_ACCOUNT_REGISTERED = true;

export default function HomePage() {
  const [tab, setTab] = useState(TABS[0].value);
  const [dorm, setDorm] = useState("");
  const [menu, setMenu] = useState("");
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { openToast } = useToast();
  const {
    data: partyList,
    isPending,
    isError,
    error,
  } = usePartyList({
    categoryId: menu ? FOOD_CATEGORY_ID_MAP[menu as FoodCategory] : undefined,
    dormitory: dorm || undefined,
  });
  const recruitingOrders = (partyList ?? [])
    .filter((party) => party.status === "RECRUITING")
    .map(toOrderItem);

  const {
    data: myPartyList,
    isPending: isMyPartyListPending,
    isError: isMyPartyListError,
    error: myPartyListError,
  } = useMyPartyList();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(intervalId);
  }, []);
  const isOngoingParty = (party: PartyListItem) =>
    ONGOING_STATUSES.has(party.status) && !isPartyAutoCancelled(party, now);
  const inProgressOrders = (myPartyList ?? [])
    .filter(isOngoingParty)
    .map((party) => toMyOrderItem(party, now));
  const pastOrders = (myPartyList ?? [])
    .filter((party) => !isOngoingParty(party))
    .map((party) => toMyOrderItem(party, now));

  useEffect(() => {
    if (!isError) return;
    openToast({
      message: getApiErrorMessage(error, API_ERROR_MESSAGE.ORDER_LIST),
    });
  }, [isError, error, openToast]);

  useEffect(() => {
    if (!isMyPartyListError) return;
    openToast({
      message: getApiErrorMessage(
        myPartyListError,
        API_ERROR_MESSAGE.MY_ORDER_LIST
      ),
    });
  }, [isMyPartyListError, myPartyListError, openToast]);

  const notifiedMatchedPartyIdsRef = useRef<Set<number>>(new Set());
  useEffect(() => {
    const matchedParty = myPartyList?.find(
      (party) =>
        party.status === "CLOSED" &&
        !notifiedMatchedPartyIdsRef.current.has(party.partyId)
    );
    if (!matchedParty) return;

    notifiedMatchedPartyIdsRef.current.add(matchedParty.partyId);
    openToast({
      message: "배달팟이 매칭되었습니다!",
      actionLabel: "채팅방 입장",
      onActionClick: () => {
        navigate(
          generatePath(PATH.ORDER_CHAT, {
            orderId: String(matchedParty.partyId),
          })
        );
      },
    });
  }, [myPartyList, openToast, navigate]);

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
        isMyPartyListPending ? (
          <p className="px-5 py-6 text-body-1 text-text-4">불러오는 중...</p>
        ) : (
          <MyOrderSection
            inProgressOrders={inProgressOrders}
            pastOrders={pastOrders}
            onCreateClick={handleCreateClick}
            onCardClick={handleCardClick}
          />
        )
      ) : isPending ? (
        <p className="px-5 py-6 text-body-1 text-text-4">불러오는 중...</p>
      ) : (
        <OrderListSection
          orders={recruitingOrders}
          dorm={dorm}
          onDormChange={setDorm}
          menu={menu}
          onMenuChange={setMenu}
          onCreateClick={handleCreateClick}
          onCardClick={handleCardClick}
        />
      )}
    </PageShell>
  );
}
