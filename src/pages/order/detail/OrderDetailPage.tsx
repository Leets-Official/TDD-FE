import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router";

import { getApiErrorMessage } from "@/api/error";
import {
  useCancelParty,
  useJoinParty,
  useLeaveParty,
  usePartyDetail,
  usePartyParticipants,
} from "@/api/order/query";
import { CtaBar } from "@/components/ctaBar/CtaBar";
import { BackHeader } from "@/layouts/BackHeader";
import { Profiles, type ProfilesItem } from "@/components/profiles/Profiles";
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

const ME: ProfilesItem = { id: "me", nickname: "나", temperature: 36.5 };

// TODO: 로그인 사용자의 실제 기숙사 인증 여부로 교체
const IS_DORM_VERIFIED = true;
// TODO: 로그인 사용자의 실제 노쇼 정지 상태로 교체
const IS_NOSHOW_RESTRICTED = false;

type ParticipationStatus = "none" | "applied" | "matched";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { openToast } = useToast();

  const partyId = Number(orderId);
  const {
    data: partyDetail,
    isPending,
    isError,
    error,
  } = usePartyDetail(partyId);
  const {
    data: partyParticipants,
    isError: isParticipantsError,
    error: participantsError,
  } = usePartyParticipants(partyId);
  const { mutate: cancelParty } = useCancelParty();
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
  // TODO: 로그인한 내 userId를 알 수 있는 API가 없어 아직 실제로는 항상 false
  const isHost = order?.host.id === ME.id;

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

  // 마감 시각이 지났는데 최소 인원을 못 채웠으면 자동 취소로 간주 (모집중 상태일 때만)
  const isAutoCancelled =
    order.status === "RECRUITING" &&
    now > order.deadline &&
    participants.length < order.minCount;
  const cancelled = isCancelled || order.isCancelled || isAutoCancelled;

  const ctaBarProps = cancelled
    ? ({ status: "cancelled" } as const)
    : status === "matched"
      ? ({
          status: "completed",
          avatars,
          maxCount: order.maxCount,
          onEnterChat: handleEnterChat,
        } as const)
      : isHost
        ? ({
            status: "hostRecruiting",
            avatars,
            maxCount: order.maxCount,
            deadline: order.deadline,
            onCancelRecruit: handleCancelRecruitClick,
          } as const)
        : status === "applied"
          ? ({
              status: "applied",
              avatars,
              maxCount: order.maxCount,
              deadline: order.deadline,
              onCancel: handleCancelClick,
            } as const)
          : participants.length >= order.maxCount
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
