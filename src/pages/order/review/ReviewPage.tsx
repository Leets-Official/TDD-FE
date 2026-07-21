import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/button/Button";
import { PageHeader } from "@/components/header/PageHeader";
import { PageShell } from "@/layouts/PageShell";

import type { MannerReaction } from "./components/MannerReactionButtons";
import { MannerReviewTarget } from "./components/MannerReviewTarget";

const DUMMY_MEMBERS = [
  { id: "1", nickname: "피자조아" },
  { id: "2", nickname: "치킨러버" },
  { id: "3", nickname: "떡볶이광" },
  { id: "4", nickname: "회오리감자" },
];

export default function ReviewPage() {
  const navigate = useNavigate();
  const [reactions, setReactions] = useState<Record<string, MannerReaction>>(
    {}
  );

  const isAllReviewed = DUMMY_MEMBERS.every((member) => reactions[member.id]);

  return (
    <PageShell
      header={
        <PageHeader
          title="매너 평가"
          onBack={() => {
            navigate(-1);
          }}
        />
      }
    >
      <div className="flex flex-col gap-xxl px-5 pt-6 pb-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-title-1 text-black">배달팟 멤버 후기</h2>
          <div className="flex flex-col gap-4.75">
            {DUMMY_MEMBERS.map((member) => (
              <MannerReviewTarget
                key={member.id}
                nickname={member.nickname}
                onReactionChange={(reaction) =>
                  setReactions((prev) => ({ ...prev, [member.id]: reaction }))
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
