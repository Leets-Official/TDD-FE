import { Fab } from "@/components/fab/Fab";

import MessageQuestionIcon from "@/assets/icons/MessageQuestionIcon.svg?react";

export interface BoardEmptyStateProps {
  onCreateClick: () => void;
}

export function BoardEmptyState({ onCreateClick }: BoardEmptyStateProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-xl">
      <MessageQuestionIcon className="h-17.75 w-16.75 text-text-5" />
      <div className="mt-6 flex flex-col items-center gap-2 text-center">
        <p className="text-title-1 text-text-1">아직 게시글이 없어요</p>
        <p className="text-label text-text-3">첫 게시글을 남겨보세요</p>
      </div>
      <Fab label="글쓰기" onClick={onCreateClick} className="mt-4" />
    </div>
  );
}
