import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { CtaBar } from "@/components/ctaBar/CtaBar";
import { BackHeader } from "@/layouts/BackHeader";
import { Profiles, type ProfilesItem } from "@/components/profiles/Profiles";
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
        props: {
          title: "배달팟을 만들거나 참여하려면 \n 기숙사 인증이 필요해요",
          description:
            "같은 기숙사생들과 안전하게 \n 배달팟을 이용할 수 있어요",
          outlineLabel: "다음에 할게요",
          primaryLabel: "인증하러 가기",
        },
        onConfirm: () => navigate(PATH.MYPAGE_DORMITORY),
      });
      return;
    }

    if (IS_NOSHOW_RESTRICTED) {
      openModal({
        props: {
          title:
            "학우님은 약속 노쇼(No-show) 신고가 \n 3회 누적되어 현재 트뜨 서비스 이용이 \n 정지된 상태입니다.",
          description: (
            <ul className="list-disc space-y-1 pl-5">
              <li>
                제한 기간: [정지 시작일] ~ <br />
                [정지 종료일 YYYY-MM-DD]
              </li>
              <li>
                제한 항목: 배달 팟 개설 및 실시간 매칭 참여 <br />
                제한 (게시판 조회만 가능)
              </li>
            </ul>
          ),
          caption:
            "클린하고 신뢰할 수 있는 기숙사 공유 문화를 위해 약속 시간을 준수해 주세요.\n관련 문의는 [고객센터/운영진]으로 접수 바랍니다.",
          outlineLabel: "확인하였습니다",
        },
      });
      return;
    }

    applyPod();
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

  const ctaBarProps =
    status === "matched"
      ? ({
          status: "completed",
          avatars,
          maxCount: pod.maxCount,
          onEnterChat: handleEnterChat,
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
