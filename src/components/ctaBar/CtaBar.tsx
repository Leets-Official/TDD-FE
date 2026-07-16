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
}

interface RecruitingCtaBarProps extends TimedCtaBarProps {
  status: "recruiting";
  onApply: () => void;
}

interface AppliedCtaBarProps extends TimedCtaBarProps {
  status: "applied";
  onCancel: () => void;
}

interface CompletedCtaBarProps extends CtaBarSharedProps {
  status: "completed";
  onEnterChat: () => void;
}

export type CtaBarProps =
  RecruitingCtaBarProps | AppliedCtaBarProps | CompletedCtaBarProps;

const BAR_CLASS =
  "flex w-full items-start justify-between border-t border-divider-2 p-5";

export function CtaBar(props: CtaBarProps) {
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
            <AvatarGroup avatars={avatars} total={maxCount} size={24} />
            <span className="text-label">
              {avatars.length}/{maxCount}명 참여
            </span>
          </div>
        </div>
        <Button onClick={onEnterChat} size="medium">
          채팅방 입장
        </Button>
      </div>
    );
  }

  return <TimedCtaBar {...props} />;
}

/** recruiting/applied 상태 전용 — useCountdown 훅이 있어 completed와 분리 */
function TimedCtaBar(props: RecruitingCtaBarProps | AppliedCtaBarProps) {
  const { avatars, maxCount, deadline, urgentThresholdMs } = props;
  const { timeLabel, isUrgent, isExpired } = useCountdown(deadline, {
    urgentThresholdMs,
  });

  return (
    <div className={BAR_CLASS}>
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <AvatarGroup avatars={avatars} total={maxCount} size={24} />
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
      {props.status === "recruiting" ? (
        <Button onClick={props.onApply} disabled={isExpired} size="medium">
          참여 신청
        </Button>
      ) : (
        <Button variant="outline" onClick={props.onCancel} size="medium">
          참여 신청 취소
        </Button>
      )}
    </div>
  );
}
