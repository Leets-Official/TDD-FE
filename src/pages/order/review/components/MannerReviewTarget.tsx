import { useState } from "react";

import { Avatar } from "@/components/avatar/Avatar";
import { MANNER_TAGS } from "@/constants/order/reviewTags";
import type { ReportReason } from "@/types/order/review";

import {
  MannerReactionButtons,
  type MannerReaction,
} from "./MannerReactionButtons";
import { MannerTagChips } from "./MannerTagChips";
import { ReportButton } from "./ReportButton";
import { ReportReasonChips } from "./ReportReasonChips";

export interface MannerReviewDraft {
  reaction: MannerReaction;
  tagIds: number[];
  content: string;
  isReported: boolean;
  report: { reason: ReportReason; content: string } | null;
}

interface DraftState extends Omit<MannerReviewDraft, "reaction"> {
  reaction: MannerReaction | null;
}

const INITIAL_DRAFT: DraftState = {
  reaction: null,
  tagIds: [],
  content: "",
  isReported: false,
  report: null,
};

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
  const [draft, setDraft] = useState<DraftState>(INITIAL_DRAFT);

  function update(patch: Partial<DraftState>) {
    const next = { ...draft, ...patch };
    setDraft(next);
    if (next.reaction) onChange?.({ ...next, reaction: next.reaction });
  }

  // 좋아요 or 싫어요 선택 시 draft 초기화
  function handleReactionChange(reaction: MannerReaction) {
    update({
      reaction,
      tagIds: [],
      content: "",
      isReported: false,
      report: null,
    });
  }

  // 매너 태그 선택 시 정보 업데이트
  function handleTagsChange(next: { tagIds: number[]; content: string }) {
    update(next);
  }

  function handleReportToggle() {
    update({ isReported: !draft.isReported, report: null });
  }

  // 신고하기 선택 시 정보 업데이트
  function handleReportChange(report: {
    reason: ReportReason;
    content: string;
  }) {
    update({ report });
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
            value={draft.reaction}
            onChange={handleReactionChange}
          />
        </div>
        {draft.reaction && (
          <MannerTagChips
            key={draft.reaction}
            tags={MANNER_TAGS[draft.reaction]}
            onChange={handleTagsChange}
          />
        )}
      </div>
      {draft.reaction === "dislike" && (
        <>
          <div className="flex w-full justify-end">
            <ReportButton
              reported={draft.isReported}
              onClick={handleReportToggle}
            />
          </div>
          {draft.isReported && (
            <ReportReasonChips
              key={draft.reaction}
              onChange={handleReportChange}
            />
          )}
        </>
      )}
    </div>
  );
}
