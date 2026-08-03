import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getApiErrorMessage } from "@/api/error";
import {
  usePartyReviewTargets,
  usePostPartyReview,
} from "@/api/order/review/query";
import { Button } from "@/components/button/Button";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import { useToast } from "@/hooks/useToast";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

import type { MannerReviewDraft } from "./components/MannerReviewTarget";
import { MannerReviewTarget } from "./components/MannerReviewTarget";

export default function ReviewPage() {
  const { orderId } = useParams();
  const partyId = Number(orderId);
  const navigate = useNavigate();
  const { openToast } = useToast();

  const { data, isError, error } = usePartyReviewTargets(partyId);
  const targets = (data?.targets ?? []).filter((target) => !target.reviewed);

  const [drafts, setDrafts] = useState<Record<number, MannerReviewDraft>>({});
  const { mutateAsync: postReview, isPending: isSubmitting } =
    usePostPartyReview();

  useEffect(() => {
    if (!isError) return;
    openToast({
      message: getApiErrorMessage(error, API_ERROR_MESSAGE.REVIEW_TARGETS),
    });
  }, [isError, error, openToast]);

  const isAllReviewed =
    targets.length > 0 && targets.every((target) => drafts[target.userId]);

  async function handleSubmit() {
    const bodies = targets.map((target) => {
      const draft = drafts[target.userId];
      return {
        revieweeId: target.userId,
        rating: (draft.reaction === "like" ? 5 : 1) as 1 | 5,
        tagIds: draft.tagIds,
        content: draft.content || undefined,
      };
    });

    try {
      await Promise.all(bodies.map((body) => postReview({ partyId, body })));

      openToast({ message: "매너 평가가 등록되었어요" });
      navigate(PATH.HOME, { replace: true });
    } catch (submitError) {
      openToast({
        message: getApiErrorMessage(
          submitError,
          API_ERROR_MESSAGE.REVIEW_CREATE
        ),
      });
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
