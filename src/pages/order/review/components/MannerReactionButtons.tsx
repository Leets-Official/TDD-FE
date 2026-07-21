import { IconButton } from "@/components/iconButton/IconButton";

import ThumbsDownIcon from "@/assets/icons/ThumbsDownIcon.svg?react";
import ThumbsUpIcon from "@/assets/icons/ThumbsUpIcon.svg?react";

export type MannerReaction = "like" | "dislike";

interface MannerReactionButtonsProps {
  value: MannerReaction | null;
  onChange: (reaction: MannerReaction) => void;
}

export function MannerReactionButtons({
  value,
  onChange,
}: MannerReactionButtonsProps) {
  return (
    <div className="flex items-center gap-l">
      <IconButton
        aria-label="좋아요"
        icon={<ThumbsUpIcon />}
        tone="manner"
        selected={value === "like"}
        onClick={() => onChange("like")}
      />
      <IconButton
        aria-label="별로예요"
        icon={<ThumbsDownIcon />}
        tone="manner"
        selected={value === "dislike"}
        onClick={() => onChange("dislike")}
      />
    </div>
  );
}
