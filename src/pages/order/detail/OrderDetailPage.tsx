import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router";

import { getApiErrorMessage } from "@/api/error";
import {
  useCancelParty,
  useCloseParty,
  useJoinParty,
  useLeaveParty,
  usePartyDetail,
  usePartyParticipants,
} from "@/api/order/query";
import { useMyPage } from "@/api/user/query";
import { CtaBar } from "@/components/ctaBar/CtaBar";
import { BackHeader } from "@/layouts/BackHeader";
import { Profiles } from "@/components/profiles/Profiles";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import {
  DORM_VERIFICATION_MODAL_PROPS,
  NOSHOW_RESTRICTION_MODAL_PROPS,
} from "@/constants/order/guardModals";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";
import { toOrderDetail } from "@/utils/order/toOrderDetail";
import { toProfilesItems } from "@/utils/order/toProfilesItems";

import { OrderHostProfile } from "./components/OrderHostProfile";

type ParticipationStatus = "none" | "applied" | "matched";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { openToast } = useToast();
  const { data: myPage, isPending: isMyPagePending } = useMyPage();
  const isDormVerified = myPage?.dormStatus === "APPROVED";
  const isNoshowRestricted = myPage?.status === "SUSPENDED";

  const partyId = Number(orderId);
  const {
    data: partyDetail,
    isPending,
    isError,
    error,
  } = usePartyDetail(partyId);
  const {
    data: partyParticipants,
    isPending: isParticipantsPending,
    isError: isParticipantsError,
    error: participantsError,
  } = usePartyParticipants(partyId);
  const { mutate: cancelParty } = useCancelParty();
  const { mutate: closeParty } = useCloseParty();
  const { mutate: joinParty } = useJoinParty();
  const { mutate: leaveParty } = useLeaveParty();
  const order = partyDetail ? toOrderDetail(partyDetail) : undefined;

  useEffect(() => {
    if (!isError) return;
    openToast({
      message: getApiErrorMessage(error, API_ERROR_MESSAGE.ORDER_DETAIL),
    });
  }, [isError, error, openToast]);

  useEffect(() => {
    if (!isParticipantsError) return;
    openToast({
      message: getApiErrorMessage(
        participantsError,
        API_ERROR_MESSAGE.ORDER_PARTICIPANTS
      ),
    });
  }, [isParticipantsError, participantsError, openToast]);

  const [status, setStatus] = useState<ParticipationStatus>("none");
  const [isCancelled, setIsCancelled] = useState(false);
  // 마감 시각 경과 여부를 실시간으로 반영하기 위한 tick
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(intervalId);
  }, []);
  const isHost =
    myPage !== undefined && order?.host.id === String(myPage.userId);

  const participants = partyParticipants
    ? toProfilesItems(partyParticipants.participants)
    : [];

  if (!Number.isFinite(partyId)) {
    return (
      <PageShell header={<BackHeader title="" />}>
        <p className="px-5 py-6 text-body-1 text-text-4">
          존재하지 않는 배달팟이에요.
        </p>
      </PageShell>
    );
  }

  if (isPending) {
    return (
      <PageShell header={<BackHeader title="" />}>
        <p className="px-5 py-6 text-body-1 text-text-4">불러오는 중...</p>
      </PageShell>
    );
  }

  if (isError) {
    return (
      <PageShell header={<BackHeader title="" />}>
        <p className="px-5 py-6 text-body-1 text-text-4">
          배달팟 정보를 불러오지 못했어요.
        </p>
      </PageShell>
    );
  }

  if (!order) {
    return (
      <PageShell header={<BackHeader title="" />}>
        <p className="px-5 py-6 text-body-1 text-text-4">
          존재하지 않는 배달팟이에요.
        </p>
      </PageShell>
    );
  }

  function handleApplyClick() {
    if (isMyPagePending) return;

    if (!isDormVerified) {
      openModal({
        props: DORM_VERIFICATION_MODAL_PROPS,
        onConfirm: () => navigate(PATH.MYPAGE_DORMITORY),
      });
      return;
    }

    if (isNoshowRestricted) {
      openModal({ props: NOSHOW_RESTRICTION_MODAL_PROPS });
      return;
    }

    joinParty(partyId, {
      onSuccess: (result) => {
        setStatus(
          result.currentParticipants >= result.maxParticipants
            ? "matched"
            : "applied"
        );
        openToast({ message: "배달팟 참여 신청이 완료되었습니다!" });
      },
      onError: (error) => {
        openToast({
          message: getApiErrorMessage(error, API_ERROR_MESSAGE.ORDER_JOIN),
        });
      },
    });
  }

  function handleCancelRecruitClick() {
    openModal({
      props: {
        title: "정말로 모집을 \n 취소하시겠습니까?",
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        cancelParty(partyId, {
          onSuccess: () => {
            setIsCancelled(true);
          },
          onError: (error) => {
            openToast({
              message: getApiErrorMessage(
                error,
                API_ERROR_MESSAGE.ORDER_CANCEL
              ),
            });
          },
        });
      },
    });
  }

  function handleCloseRecruitClick() {
    openModal({
      props: {
        title: "정말로 모집을 \n 마감하시겠습니까?",
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        closeParty(partyId, {
          onError: (error) => {
            openToast({
              message: getApiErrorMessage(error, API_ERROR_MESSAGE.ORDER_CLOSE),
            });
          },
        });
      },
    });
  }

  function handleCancelClick() {
    openModal({
      props: {
        title: "정말로 배달팟 참여를 \n 취소하시겠습니까?",
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        leaveParty(partyId, {
          onSuccess: () => {
            setStatus("none");
          },
          onError: (error) => {
            openToast({
              message: getApiErrorMessage(error, API_ERROR_MESSAGE.ORDER_LEAVE),
            });
          },
        });
      },
    });
  }

  function handleEnterChat() {
    if (!orderId) return;
    navigate(generatePath(PATH.ORDER_CHAT, { orderId }));
  }

  const avatars = participants.map((p) => ({
    id: p.id,
    src: p.src,
    alt: p.nickname,
  }));

  // 새로고침/재진입 시 로컬 status가 초기화되므로, 서버 참여자 목록에서 내 참여 여부를 우선 파생
  const myParticipant =
    myPage !== undefined
      ? participants.find((p) => p.id === String(myPage.userId))
      : undefined;
  const serverDerivedStatus: ParticipationStatus = myParticipant
    ? participants.length >= order.maxCount
      ? "matched"
      : "applied"
    : "none";
  // 참여자 목록이 한 번이라도 성공적으로 로드됐으면 서버 값이 우선, 그 전까지만 로컬 낙관값 사용
  const effectiveStatus: ParticipationStatus =
    partyParticipants !== undefined ? serverDerivedStatus : status;

  // 마감 시각이 지났는데 최소 인원을 못 채웠으면 자동 취소로 간주 (모집중 상태일 때만, 참여자 조회가 끝난 후에만)
  const isAutoCancelled =
    !isParticipantsPending &&
    !isParticipantsError &&
    order.status === "RECRUITING" &&
    now > order.deadline &&
    participants.length < order.minCount;
  const cancelled = isCancelled || order.isCancelled || isAutoCancelled;
  const isRecruitingOpen = order.status === "RECRUITING";
  const completedCta = {
    status: "completed",
    avatars,
    maxCount: order.maxCount,
    onEnterChat: handleEnterChat,
  } as const;

  const ctaBarProps = cancelled
    ? ({ status: "cancelled" } as const)
    : effectiveStatus === "matched"
      ? completedCta
      : isHost
        ? !isRecruitingOpen
          ? completedCta
          : ({
              status: "hostRecruiting",
              avatars,
              maxCount: order.maxCount,
              deadline: order.deadline,
              onCancelRecruit: handleCancelRecruitClick,
              onCloseRecruit: handleCloseRecruitClick,
              canCloseRecruit: participants.length >= order.minCount,
            } as const)
        : effectiveStatus === "applied"
          ? !isRecruitingOpen
            ? completedCta
            : ({
                status: "applied",
                avatars,
                maxCount: order.maxCount,
                deadline: order.deadline,
                onCancel: handleCancelClick,
              } as const)
          : !isRecruitingOpen || participants.length >= order.maxCount
            ? ({ status: "full" } as const)
            : ({
                status: "recruiting",
                avatars,
                maxCount: order.maxCount,
                deadline: order.deadline,
                onApply: handleApplyClick,
              } as const);

  return (
    <PageShell
      header={<BackHeader title="" />}
      bottom={<CtaBar {...ctaBarProps} />}
      bottomClassName="p-0"
    >
      <div className="flex flex-col px-5 pb-8">
        <div className="flex flex-col gap-xxl">
          <div className="flex flex-col">
            <OrderHostProfile
              nickname={order.host.nickname}
              temperature={order.host.temperature}
              src={order.host.src}
            />

            <div className="flex items-center gap-1 text-body-2 text-text-4">
              <span>{order.category}</span>
              {order.location && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{order.location}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-title-2 text-text-1">{order.title}</h1>
            <p className="text-body-1 whitespace-pre-line text-text-1">
              {order.description}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-xl">
          <div className="-mx-5 h-px bg-divider-1" />
          <Profiles participants={participants} maxCount={order.maxCount} />
        </div>
      </div>
    </PageShell>
  );
}
