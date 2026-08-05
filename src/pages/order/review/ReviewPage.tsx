import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getApiErrorMessage } from "@/api/error";
import {
  usePartyReviewTargets,
  usePostPartyReport,
  usePostPartyReview,
} from "@/api/order/review/query";
import { Button } from "@/components/button/Button";
import { ORDER_ERROR_MESSAGE } from "@/constants/errorMessage/order";
import { useToast } from "@/hooks/useToast";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

import type { MannerReviewDraft } from "./components/MannerReviewTarget";
import { MannerReviewTarget } from "./components/MannerReviewTarget";

// 평가 제출 가능상태인지 판단하는 함수
function isDraftComplete(draft?: MannerReviewDraft) {
  if (!draft) return false;
  if (!draft.isReported) return true;
  if (!draft.report) return false;
  if (draft.report.reason === "ETC") {
    return draft.report.content.trim().length > 0;
  }
  return true;
}

// 매너 평가 body로 변환하는 함수
function toReviewBody(userId: number, draft: MannerReviewDraft) {
  return {
    revieweeId: userId,
    rating: (draft.reaction === "like" ? 5 : 1) as 1 | 5,
    tagIds: draft.tagIds,
    content: draft.content || undefined,
  };
}

// 신고 body로 변환하는 함수
function toReportBody(
  userId: number,
  report: NonNullable<MannerReviewDraft["report"]>
) {
  return {
    reportedUserId: userId,
    reason: report.reason,
    content: report.content || undefined,
  };
}

export default function ReviewPage() {
  const { orderId } = useParams();
  const partyId = Number(orderId);
  const navigate = useNavigate();
  const { openToast } = useToast();

  // 매너 평가 대상자 조회
  const { data, isError, error } = usePartyReviewTargets(partyId);
  const targets = (data?.targets ?? []).filter((target) => !target.reviewed);

  const [drafts, setDrafts] = useState<Record<number, MannerReviewDraft>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: postReview } = usePostPartyReview();
  const { mutateAsync: postReport } = usePostPartyReport();

  useEffect(() => {
    if (!isError) return;
    openToast({
      message: getApiErrorMessage(error, ORDER_ERROR_MESSAGE.REVIEW_TARGETS),
    });
  }, [isError, error, openToast]);

  // 모든 대상자에 대해 필수 평가가 완료 되었는지 -> 버튼 활성화 관련
  const isAllReviewed =
    targets.length > 0 &&
    targets.every((target) => isDraftComplete(drafts[target.userId]));

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      const requests = targets.flatMap((target) => {
        const draft = drafts[target.userId];
        const reviewRequest = postReview({
          partyId,
          body: toReviewBody(target.userId, draft),
        });
        if (!draft.report) return [reviewRequest];

        // 신고가 있는 경우 신고 요청도 함께
        const reportRequest = postReport({
          partyId,
          body: toReportBody(target.userId, draft.report),
        });
        return [reviewRequest, reportRequest];
      });

      await Promise.all(requests);

      openToast({ message: "매너 평가가 등록되었어요" });
      navigate(PATH.HOME, { replace: true });
    } catch (submitError) {
      openToast({
        message: getApiErrorMessage(
          submitError,
          ORDER_ERROR_MESSAGE.REVIEW_CREATE
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell header={<BackHeader title="매너 평가" />}>
      <div className="flex flex-col gap-xxl px-5 pt-6 pb-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-title-1 text-black">배달팟 멤버 후기</h2>
          <div className="flex flex-col gap-4.75">
            {targets.map((target) => (
              <MannerReviewTarget
                key={target.userId}
                nickname={target.nickname}
                avatarSrc={target.profileImageUrl ?? undefined}
                onChange={(draft) =>
                  setDrafts((prev) => ({
                    ...prev,
                    [target.userId]: draft,
                  }))
                }
              />
            ))}
          </div>
        </div>
        <Button
          disabled={!isAllReviewed || isSubmitting}
          className="w-full"
          onClick={handleSubmit}
        >
          완료
        </Button>
      </div>
    </PageShell>
  );
}
