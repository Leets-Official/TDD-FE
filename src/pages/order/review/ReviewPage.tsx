import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getApiErrorMessage } from "@/api/error";
import { usePartyReviewTargets } from "@/api/order/review/query";
import { Button } from "@/components/button/Button";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import { useToast } from "@/hooks/useToast";
import { BackHeader } from "@/layouts/BackHeader";
import { PageShell } from "@/layouts/PageShell";

import type { MannerReaction } from "./components/MannerReactionButtons";
import { MannerReviewTarget } from "./components/MannerReviewTarget";

export default function ReviewPage() {
  const { orderId } = useParams();
  const partyId = Number(orderId);
  const { openToast } = useToast();

  const { data, isError, error } = usePartyReviewTargets(partyId);
  const targets = data?.targets ?? [];

  const [reactions, setReactions] = useState<Record<number, MannerReaction>>(
    {}
  );

  useEffect(() => {
    if (!isError) return;
    openToast({
      message: getApiErrorMessage(error, API_ERROR_MESSAGE.REVIEW_TARGETS),
    });
  }, [isError, error, openToast]);

  const isAllReviewed = targets.every((target) => reactions[target.userId]);

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
                onReactionChange={(reaction) =>
                  setReactions((prev) => ({
                    ...prev,
                    [target.userId]: reaction,
                  }))
                }
              />
            ))}
          </div>
        </div>
        <Button disabled={!isAllReviewed} className="w-full">
          완료
        </Button>
      </div>
    </PageShell>
  );
}
