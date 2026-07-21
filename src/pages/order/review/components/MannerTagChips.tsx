import { useState } from "react";

import { Chip } from "@/components/chip/Chip";
import { Textarea } from "@/components/textarea/Textarea";

import EditIcon from "@/assets/icons/EditIcon.svg?react";

interface MannerTagChipsProps {
  tags: string[];
}

export function MannerTagChips({ tags }: MannerTagChipsProps) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [isCustomInputOpen, setIsCustomInputOpen] = useState(false);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-xxs">
        {tags.map((tag) => (
          <Chip
            key={tag}
            selected={selectedTags.has(tag)}
            onClick={() => toggleTag(tag)}
          >
            {tag}
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
        />
      )}
    </div>
  );
}
