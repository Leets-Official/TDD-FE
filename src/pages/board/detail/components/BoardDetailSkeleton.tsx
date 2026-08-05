import { Skeleton } from "@/components/skeleton/Skeleton";

const SKELETON_COMMENT_COUNT = 3;

function BoardPostSectionSkeleton() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full px-5">
        <div className="flex items-center gap-2">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-9 px-5 pt-4 pb-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-1/2" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>

        <Skeleton className="h-4 w-10" />
      </div>

      <div className="h-px w-full bg-divider-2" />
    </div>
  );
}

function BoardCommentItemSkeleton() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-start gap-2 px-5 pt-4">
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-2">
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        <Skeleton className="my-3 h-5 w-14" />
        <div className="h-px w-full bg-divider-1" />
      </div>
    </div>
  );
}

export function BoardCommentListSkeleton() {
  return (
    <div
      role="status"
      aria-label="댓글을 불러오는 중"
      className="flex w-full flex-col"
    >
      {Array.from({ length: SKELETON_COMMENT_COUNT }, (_, index) => (
        <BoardCommentItemSkeleton key={index} />
      ))}
    </div>
  );
}

export function BoardDetailSkeleton() {
  return (
    <div
      role="status"
      aria-label="게시글을 불러오는 중"
      className="flex w-full flex-col"
    >
      <BoardPostSectionSkeleton />
      {Array.from({ length: SKELETON_COMMENT_COUNT }, (_, index) => (
        <BoardCommentItemSkeleton key={index} />
      ))}
    </div>
  );
}
