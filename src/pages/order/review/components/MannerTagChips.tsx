import { useState } from "react";

import { Chip } from "@/components/chip/Chip";
import { Textarea } from "@/components/textarea/Textarea";
import type { ReviewTagOption } from "@/constants/order/reviewTags";

import EditIcon from "@/assets/icons/EditIcon.svg?react";

interface MannerTagChipsProps {
  tags: string[] | ReviewTagOption[];
  onChange?: (state: { tagIds: number[]; content: string }) => void;
}

export function MannerTagChips({ tags, onChange }: MannerTagChipsProps) {
  const options = tags.map((tag, index) =>
    typeof tag === "string" ? { id: index, label: tag } : tag
  );
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isCustomInputOpen, setIsCustomInputOpen] = useState(false);
  const [customInputValue, setCustomInputValue] = useState("");

  function toggleTag(id: number) {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
    onChange?.({ tagIds: Array.from(next), content: customInputValue });
  }

  function handleCustomInputChange(value: string) {
    setCustomInputValue(value);
    onChange?.({ tagIds: Array.from(selectedIds), content: value });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-xxs">
        {options.map((tag) => (
          <Chip
            key={tag.id}
            selected={selectedIds.has(tag.id)}
            onClick={() => toggleTag(tag.id)}
          >
            {tag.label}
          </Chip>
        ))}
        <Chip
          icon={<EditIcon />}
          selected={isCustomInputOpen}
          onClick={() => setIsCustomInputOpen((prev) => !prev)}
        >
          직접입력
        </Chip>
      </div>
      {isCustomInputOpen && (
        <Textarea
          label="직접입력"
          placeholder="직접입력"
          wrapperClassName="mt-4.75"
          value={customInputValue}
          onChange={(event) => handleCustomInputChange(event.target.value)}
        />
      )}
    </div>
  );
}
