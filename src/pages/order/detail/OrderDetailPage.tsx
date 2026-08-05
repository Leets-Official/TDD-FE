import type { ReactNode } from "react";
import { useParams } from "react-router";

import { CtaBar, type CtaBarProps } from "@/components/ctaBar/CtaBar";
import { useMe } from "@/hooks/useMe";
import { useNowAt } from "@/hooks/useNowAt";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";

import { OrderDetailBody } from "./components/OrderDetailBody";
import {
  OrderCtaBarSkeleton,
  OrderDetailSkeleton,
} from "./components/OrderDetailSkeleton";
import {
  useOrderActions,
  type ParticipationStatus,
} from "./hooks/useOrderActions";
import { useOrderDetail } from "./hooks/useOrderDetail";

interface OrderDetailView {
  body: ReactNode;
  bottom?: ReactNode;
}

function OrderDetailMessage({ children }: { children: ReactNode }) {
  return <p className="px-5 py-6 text-body-1 text-text-4">{children}</p>;
}

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const { userId } = useMe();

  const partyId = Number(orderId);
  const {
    order,
    participants,
    hasParticipantsLoaded,
    isPending,
    isError,
    isParticipantsPending,
    isParticipantsError,
  } = useOrderDetail(partyId);
  const {
    status,
    isCancelled,
    isActionPending,
    handleApplyClick,
    handleCancelRecruitClick,
    handleCloseRecruitClick,
    handleCancelClick,
    handleEnterChat,
  } = useOrderActions({ partyId, orderId });

  const now = useNowAt([order?.deadline]);

  const resolveView = (): OrderDetailView => {
    if (!Number.isFinite(partyId)) {
      return {
        body: (
          <OrderDetailMessage>존재하지 않는 배달팟이에요.</OrderDetailMessage>
        ),
      };
    }

    if (isPending) {
      return { body: <OrderDetailSkeleton />, bottom: <OrderCtaBarSkeleton /> };
    }

    if (isError) {
      return {
        body: (
          <OrderDetailMessage>
            배달팟 정보를 불러오지 못했어요.
          </OrderDetailMessage>
        ),
      };
    }

    if (!order) {
      return {
        body: (
          <OrderDetailMessage>존재하지 않는 배달팟이에요.</OrderDetailMessage>
        ),
      };
    }

    const isHost = userId !== undefined && order.host.id === userId;
    const avatars = participants.map((p) => ({
      id: p.id,
      src: p.src,
      alt: p.nickname,
    }));

    // 새로고침/재진입 시 로컬 status가 초기화되므로, 서버 참여자 목록에서 내 참여 여부를 우선 파생
    const myParticipant =
      userId !== undefined
        ? participants.find((p) => p.id === userId)
        : undefined;
    const serverDerivedStatus: ParticipationStatus = myParticipant
      ? participants.length >= order.maxCount
        ? "matched"
        : "applied"
      : "none";
    // 참여자 목록이 한 번이라도 성공적으로 로드됐으면 서버 값이 우선, 그 전까지만 로컬 낙관값 사용
    const effectiveStatus: ParticipationStatus = hasParticipantsLoaded
      ? serverDerivedStatus
      : status;

    // 마감 시각이 지났는데 최소 인원을 못 채웠으면 자동 취소로 간주 (모집중 상태일 때만, 참여자 조회가 끝난 후에만)
    const isAutoCancelled =
      !isParticipantsPending &&
      !isParticipantsError &&
      order.status === "RECRUITING" &&
      now > order.deadline &&
      participants.length < order.minCount;
    const cancelled = isCancelled || order.isCancelled || isAutoCancelled;
    const isRecruitingOpen = order.status === "RECRUITING";
    const completedCta: CtaBarProps = {
      status: "completed",
      avatars,
      maxCount: order.maxCount,
      onEnterChat: handleEnterChat,
    };

    const resolveCtaBarProps = (): CtaBarProps => {
      if (cancelled) return { status: "cancelled" };
      if (effectiveStatus === "matched") return completedCta;

      if (isHost) {
        if (!isRecruitingOpen) return completedCta;

        return {
          status: "hostRecruiting",
          avatars,
          maxCount: order.maxCount,
          deadline: order.deadline,
          onCancelRecruit: handleCancelRecruitClick,
          onCloseRecruit: handleCloseRecruitClick,
          canCloseRecruit: participants.length >= order.minCount,
          isPending: isActionPending,
        };
      }

      if (effectiveStatus === "applied") {
        if (!isRecruitingOpen) return completedCta;

        return {
          status: "applied",
          avatars,
          maxCount: order.maxCount,
          deadline: order.deadline,
          onCancel: handleCancelClick,
          isPending: isActionPending,
        };
      }

      if (!isRecruitingOpen || participants.length >= order.maxCount) {
        return { status: "full" };
      }

      return {
        status: "recruiting",
        avatars,
        maxCount: order.maxCount,
        deadline: order.deadline,
        onApply: handleApplyClick,
        isPending: isActionPending,
      };
    };

    return {
      body: (
        <OrderDetailBody
          order={order}
          participants={participants}
          isParticipantsPending={isParticipantsPending}
        />
      ),
      bottom: <CtaBar {...resolveCtaBarProps()} />,
    };
  };

  const { body, bottom } = resolveView();

  return (
    <PageShell
      header={<BackHeader title="" />}
      bottom={bottom}
      bottomClassName="p-0"
    >
      {body}
    </PageShell>
  );
}
