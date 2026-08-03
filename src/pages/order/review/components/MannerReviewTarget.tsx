import { useState } from "react";

import { Avatar } from "@/components/avatar/Avatar";
import { MANNER_TAGS, REPORT_TAGS } from "@/constants/order/reviewTags";

import {
  MannerReactionButtons,
  type MannerReaction,
} from "./MannerReactionButtons";
import { MannerTagChips } from "./MannerTagChips";
import { ReportButton } from "./ReportButton";

export interface MannerReviewDraft {
  reaction: MannerReaction;
  tagIds: number[];
  content: string;
}

interface MannerReviewTargetProps {
  nickname: string;
  avatarSrc?: string;
  onChange?: (draft: MannerReviewDraft) => void;
}

export function MannerReviewTarget({
  nickname,
  avatarSrc,
  onChange,
}: MannerReviewTargetProps) {
  const [reaction, setReaction] = useState<MannerReaction | null>(null);
  const [isReported, setIsReported] = useState(false);

  function handleReactionChange(next: MannerReaction) {
    setReaction(next);
    if (next !== "dislike") setIsReported(false);
    onChange?.({ reaction: next, tagIds: [], content: "" });
  }

  function handleTagsChange(next: { tagIds: number[]; content: string }) {
    if (!reaction) return;
    onChange?.({ reaction, ...next });
  }

  return (
    <div className="flex w-full flex-col gap-xxl">
      <div className="flex flex-col gap-l">
        <div className="flex w-full items-end justify-between">
          <div className="flex items-start gap-2.25">
            <Avatar src={avatarSrc} alt={nickname} size={56} />
            <p className="text-label text-black">{nickname}</p>
          </div>
          <MannerReactionButtons
            value={reaction}
            onChange={handleReactionChange}
          />
        </div>
        {reaction && (
          <MannerTagChips
            key={reaction}
            tags={MANNER_TAGS[reaction]}
            onChange={handleTagsChange}
          />
        )}
      </div>
      {reaction === "dislike" && (
        <>
          <div className="flex w-full justify-end">
            <ReportButton
              reported={isReported}
              onClick={() => setIsReported((prev) => !prev)}
            />
          </div>
          {isReported && <MannerTagChips tags={REPORT_TAGS} />}
        </>
      )}
    </div>
  );
}
