import { useState } from "react";

import { Chip } from "@/components/chip/Chip";
import { Textarea } from "@/components/textarea/Textarea";
import { REPORT_REASONS } from "@/constants/order/reviewTags";
import type { ReportReason } from "@/types/order/review";

interface ReportReasonChipsProps {
  onChange?: (state: { reason: ReportReason; content: string }) => void;
}

export function ReportReasonChips({ onChange }: ReportReasonChipsProps) {
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(
    null
  );
  const [content, setContent] = useState("");

  // ETC일때만 필수이기 때문에
  function selectReason(reason: ReportReason) {
    const nextContent = reason === "ETC" ? content : "";
    setSelectedReason(reason);
    setContent(nextContent);
    onChange?.({ reason, content: nextContent });
  }

  function handleContentChange(value: string) {
    setContent(value);
    if (selectedReason) onChange?.({ reason: selectedReason, content: value });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-xxs">
        {REPORT_REASONS.map((option) => (
          <Chip
            key={option.reason}
            selected={selectedReason === option.reason}
            onClick={() => selectReason(option.reason)}
          >
            {option.label}
          </Chip>
        ))}
      </div>
      {selectedReason === "ETC" && (
        <Textarea
          label="신고 사유"
          placeholder="직접 입력"
          wrapperClassName="mt-4.75"
          value={content}
          onChange={(event) => handleContentChange(event.target.value)}
        />
      )}
    </div>
  );
}
