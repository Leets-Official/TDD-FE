import { cn } from "@/utils/cn";

import { Avatar } from "@/components/avatar/Avatar";

export interface ProfilesItem {
  id: string;
  nickname: string;
  temperature: number;
  src?: string;
}

export interface ProfilesProps {
  participants: ProfilesItem[];
  maxCount: number;
  className?: string;
}

export function Profiles({ participants, maxCount, className }: ProfilesProps) {
  const emptyCount = Math.max(0, maxCount - participants.length);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-label text-black">
        {participants.length}/{maxCount}명{" "}
        <span className="text-body-2">참여신청 중</span>
      </p>
      <div className="flex items-start gap-12">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="inline-flex flex-col items-center"
          >
            <Avatar
              src={participant.src}
              alt={participant.nickname}
              size={48}
            />
            <span className="text-body-2 whitespace-nowrap text-text-1">
              {participant.nickname}
            </span>
            <span className="text-caption-1 text-primary">
              {participant.temperature}°C
            </span>
          </div>
        ))}
        {Array.from({ length: emptyCount }, (_, index) => (
          <Avatar key={`empty-${index}`} empty size={48} />
        ))}
      </div>
    </div>
  );
}
