import { Skeleton } from "@/components/skeleton/Skeleton";

const SKELETON_ITEM_COUNT = 5;

function BoardListItemSkeleton() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-start gap-4 px-5 pt-6 pb-4">
        <div className="flex w-full flex-col items-start gap-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      <div className="h-px w-full bg-divider-1" />
    </div>
  );
}

export function BoardListSkeleton() {
  return (
    <div
      role="status"
      aria-label="게시글 목록을 불러오는 중"
      className="flex flex-col"
    >
      {Array.from({ length: SKELETON_ITEM_COUNT }, (_, index) => (
        <BoardListItemSkeleton key={index} />
      ))}
    </div>
  );
}
