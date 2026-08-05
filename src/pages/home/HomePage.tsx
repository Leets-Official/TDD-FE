import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useMyPartyList, usePartyList } from "@/api/order/query";
import { useBankAccount } from "@/api/user/query";
import { useMe } from "@/hooks/useMe";
import { getApiErrorMessage } from "@/api/error";
import type { PartyListItem } from "@/types/order/order";
import type { FoodCategory } from "@/components/card/categoryIcons";
import { HomeHeader } from "@/components/header/HomeHeader";
import { TabBar } from "@/components/tabBar/TabBar";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import {
  ACCOUNT_UNREGISTERED_MODAL_PROPS,
  NOSHOW_RESTRICTION_MODAL_PROPS,
} from "@/constants/order/guardModals";
import { FOOD_CATEGORY_ID_MAP } from "@/constants/order/foodCategory";
import { useDormVerificationGuard } from "@/hooks/useDormVerificationGuard";
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

// 진행중(ONGOING) 정책: RECRUITING·CLOSED·ORDERED·DELIVERED(정산 전) / 그 외(SETTLED 등)는 지난 배달팟
const ONGOING_STATUSES = new Set([
  "RECRUITING",
  "CLOSED",
  "ORDERED",
  "DELIVERED",
]);

export default function HomePage() {
  const [tab, setTab] = useState(TABS[0].value);
  const [dorm, setDorm] = useState("");
  const [menu, setMenu] = useState("");
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { openToast } = useToast();
  const { isNoshowRestricted } = useMe();
  const { ensureDormVerified } = useDormVerificationGuard();
  const { data: bankAccount, isPending: isBankAccountPending } =
    useBankAccount();
  const isAccountRegistered = !!bankAccount;
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

  return (
    <PageShell
      header={
        <>
          <HomeHeader />
          <TabBar tabs={TABS} value={tab} onChange={setTab} />
        </>
      }
    >
      {tab === "mine" ? (
        <MyOrderSection
          inProgressOrders={inProgressOrders}
          pastOrders={pastOrders}
          isPending={isMyPartyListPending}
          onCreateClick={handleCreateClick}
          onCardClick={handleCardClick}
        />
      ) : (
        <OrderListSection
          orders={recruitingOrders}
          dorm={dorm}
          onDormChange={setDorm}
          menu={menu}
          onMenuChange={setMenu}
          isPending={isPending}
          onCreateClick={handleCreateClick}
          onCardClick={handleCardClick}
        />
      )}
    </PageShell>
  );
}
