import { Skeleton } from "@/components/skeleton/Skeleton";

const SKELETON_CARD_COUNT = 3;

function OrderCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-xxs rounded-lg border border-divider-3 bg-white px-padding-m py-8">
      <div className="flex gap-5.5">
        <Skeleton className="size-15 shrink-0 rounded-md" />

        <div className="flex flex-1 flex-col justify-center gap-xl">
          <Skeleton className="h-6 w-40" />

          <div className="flex flex-col gap-xxs">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderListSkeleton() {
  return (
    <div
      role="status"
      aria-label="배달팟 목록을 불러오는 중"
      className="flex flex-col gap-xxl px-xl pb-24"
    >
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </div>
  );
}
