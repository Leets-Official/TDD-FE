import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { CtaBar } from "@/components/ctaBar/CtaBar";
import { BackHeader } from "@/layouts/BackHeader";
import { Profiles, type ProfilesItem } from "@/components/profiles/Profiles";
import {
  DORM_VERIFICATION_MODAL_PROPS,
  NOSHOW_RESTRICTION_MODAL_PROPS,
} from "@/constants/order/guardModals";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

import { PodHostProfile } from "./components/PodHostProfile";
import { podDetails } from "./detail.mock";

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

  const pod = orderId ? podDetails[orderId] : undefined;

  const [participants, setParticipants] = useState<ProfilesItem[]>(
    pod?.participants ?? []
  );
  const [status, setStatus] = useState<ParticipationStatus>("none");
  const [, forceUpdate] = useState(0);
  const isHost = pod?.host.id === ME.id;

  if (!pod) {
    return (
      <PageShell header={<BackHeader title="" />}>
        <p className="px-5 py-6 text-body-1 text-text-4">
          존재하지 않는 배달팟이에요.
        </p>
      </PageShell>
    );
  }

  function applyPod() {
    const nextParticipants = [...participants, ME];
    setParticipants(nextParticipants);
    setStatus(nextParticipants.length >= pod!.maxCount ? "matched" : "applied");
    openToast({ message: "배달팟 참여 신청이 완료되었습니다!" });
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

    applyPod();
  }

  function handleCancelRecruitClick() {
    openModal({
      props: {
        title: "정말로 모집을 \n 취소하시겠습니까?",
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        pod!.isCancelled = true;
        forceUpdate((n) => n + 1);
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
        setParticipants((prev) => prev.filter((p) => p.id !== ME.id));
        setStatus("none");
      },
    });
  }

  function handleEnterChat() {
    // TODO: 채팅방 페이지 구현 후 실제 이동으로 교체
  }

  const avatars = participants.map((p) => ({
    id: p.id,
    src: p.src,
    alt: p.nickname,
  }));

  const ctaBarProps = pod.isCancelled
    ? ({ status: "cancelled" } as const)
    : status === "matched"
      ? ({
          status: "completed",
          avatars,
          maxCount: pod.maxCount,
          onEnterChat: handleEnterChat,
        } as const)
      : isHost
        ? ({
            status: "hostRecruiting",
            avatars,
            maxCount: pod.maxCount,
            deadline: pod.deadline,
            onCancelRecruit: handleCancelRecruitClick,
          } as const)
        : status === "applied"
          ? ({
              status: "applied",
              avatars,
              maxCount: pod.maxCount,
              deadline: pod.deadline,
              onCancel: handleCancelClick,
            } as const)
          : participants.length >= pod.maxCount
            ? ({ status: "full" } as const)
            : ({
                status: "recruiting",
                avatars,
                maxCount: pod.maxCount,
                deadline: pod.deadline,
                onApply: handleApplyClick,
              } as const);

  return (
    <PageShell
      header={<BackHeader title="" />}
      bottom={
        <div className="-mx-5 -mt-3 -mb-[calc(16px+env(safe-area-inset-bottom))]">
          <CtaBar {...ctaBarProps} />
        </div>
      }
    >
      <div className="flex flex-col px-5 pb-8">
        <div className="flex flex-col gap-xxl">
          <div className="flex flex-col">
            <PodHostProfile
              nickname={pod.host.nickname}
              temperature={pod.host.temperature}
              src={pod.host.src}
            />

            <div className="flex items-center gap-1 text-body-2 text-text-4">
              <span>{pod.category}</span>
              <span aria-hidden="true">·</span>
              <span>{pod.location}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-title-2 text-text-1">{pod.title}</h1>
            <p className="text-body-1 whitespace-pre-line text-text-1">
              {pod.description}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-xl">
          <div className="-mx-5 h-px bg-divider-1" />
          <Profiles participants={participants} maxCount={pod.maxCount} />
        </div>
      </div>
    </PageShell>
  );
}
