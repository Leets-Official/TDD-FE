import { cn } from "@/utils/cn";

import {
  AvatarGroup,
  type AvatarGroupItem,
} from "@/components/avatar/AvatarGroup";
import { TimeBadge } from "@/components/badge/TimeBadge";
import { Button } from "@/components/button/Button";
import { useCountdown } from "@/hooks/useCountdown";

interface CtaBarSharedProps {
  avatars: AvatarGroupItem[];
  maxCount: number;
}

interface TimedCtaBarProps extends CtaBarSharedProps {
  deadline: number;
  urgentThresholdMs?: number;
  // 요청 처리 중에는 이 배달팟의 CTA를 모두 막아 중복 전송을 방지합니다
  isPending?: boolean;
}

interface RecruitingCtaBarProps extends TimedCtaBarProps {
  status: "recruiting";
  onApply: () => void;
}

interface AppliedCtaBarProps extends TimedCtaBarProps {
  status: "applied";
  onCancel: () => void;
}

interface HostRecruitingCtaBarProps extends TimedCtaBarProps {
  status: "hostRecruiting";
  onCancelRecruit: () => void;
  onCloseRecruit: () => void;
  canCloseRecruit: boolean;
}

interface CompletedCtaBarProps extends CtaBarSharedProps {
  status: "completed";
  onEnterChat: () => void;
}

interface FullCtaBarProps {
  status: "full";
}

interface CancelledCtaBarProps {
  status: "cancelled";
}

export type CtaBarProps =
  | RecruitingCtaBarProps
  | AppliedCtaBarProps
  | HostRecruitingCtaBarProps
  | CompletedCtaBarProps
  | FullCtaBarProps
  | CancelledCtaBarProps;

const BAR_CLASS =
  "flex w-full items-start justify-between border-t border-divider-2 p-5";

export function CtaBar(props: CtaBarProps) {
  if (props.status === "full") {
    return (
      <div className={cn(BAR_CLASS, "items-center")}>
        <span className="text-title-2 text-text-1">
          모집완료된 배달팟입니다
        </span>
        <Button disabled size="medium" className="w-32.5">
          참여 신청
        </Button>
      </div>
    );
  }

  if (props.status === "cancelled") {
    return (
      <div className={cn(BAR_CLASS, "items-center")}>
        <span className="text-title-2 text-text-1">취소된 배달팟입니다</span>
        <Button disabled size="medium" className="w-32.5">
          참여 신청
        </Button>
      </div>
    );
  }

  if (props.status === "completed") {
    const { avatars, maxCount, onEnterChat } = props;
    return (
      <div className={cn(BAR_CLASS, "items-end")}>
        <div className="flex flex-col gap-4 text-black">
          <div className="flex flex-col gap-1">
            <p className="text-title-2">모집이 완료되었어요!</p>
            <p className="text-caption-1">채팅방에 입장해주세요</p>
          </div>
          <div className="flex items-center gap-2">
            <AvatarGroup
              avatars={avatars}
              total={maxCount}
              max={maxCount}
              size={24}
            />
            <span className="text-label">
              {avatars.length}/{maxCount}명 참여
            </span>
          </div>
        </div>
        <Button onClick={onEnterChat} size="medium" className="w-32.5">
          채팅방 입장
        </Button>
      </div>
    );
  }

  return <TimedCtaBar {...props} />;
}

/** recruiting/applied/hostRecruiting 상태 전용 — useCountdown 훅이 있어 completed와 분리 */
function TimedCtaBar(
  props: RecruitingCtaBarProps | AppliedCtaBarProps | HostRecruitingCtaBarProps
) {
  const { avatars, maxCount, deadline, urgentThresholdMs, isPending } = props;
  const { timeLabel, isUrgent, isExpired } = useCountdown(deadline, {
    urgentThresholdMs,
  });

  return (
    <div
      className={
        props.status === "hostRecruiting"
          ? cn(BAR_CLASS, "items-end")
          : BAR_CLASS
      }
    >
      {props.status === "hostRecruiting" ? (
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-col items-start">
            <AvatarGroup
              avatars={avatars}
              total={maxCount}
              max={maxCount}
              size={24}
            />
            <span className="text-label whitespace-nowrap text-text-1">
              {avatars.length}/{maxCount}명 참여신청 중
            </span>
          </div>
          <TimeBadge
            timeLabel={timeLabel}
            isUrgent={isUrgent}
            isExpired={isExpired}
          />
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <AvatarGroup
              avatars={avatars}
              total={maxCount}
              max={maxCount}
              size={24}
            />
            <span className="text-label text-text-1">
              {avatars.length}/{maxCount}명 참여신청 중
            </span>
          </div>
          <TimeBadge
            timeLabel={timeLabel}
            isUrgent={isUrgent}
            isExpired={isExpired}
          />
        </div>
      )}
      {props.status === "recruiting" ? (
        <Button
          onClick={props.onApply}
          disabled={isExpired || isPending}
          size="medium"
          className="w-32.5"
        >
          참여 신청
        </Button>
      ) : props.status === "hostRecruiting" ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={props.onCancelRecruit}
            disabled={isPending}
            size="medium"
            className="whitespace-nowrap"
          >
            모집 취소
          </Button>
          <Button
            variant="outline"
            onClick={props.onCloseRecruit}
            disabled={!props.canCloseRecruit || isPending}
            size="medium"
            className="whitespace-nowrap"
          >
            모집 마감
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={props.onCancel}
          disabled={isPending}
          size="medium"
          className="w-32.5 whitespace-nowrap"
        >
          참여 신청 취소
        </Button>
      )}
    </div>
  );
}
