import { Skeleton } from "@/components/skeleton/Skeleton";

const SKELETON_PARTICIPANT_COUNT = 3;

export function OrderCtaBarSkeleton() {
  return (
    <div className="flex w-full items-center justify-between border-t border-divider-2 p-5">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-12 w-32.5 rounded-md" />
    </div>
  );
}

export interface OrderParticipantsSkeletonProps {
  count?: number;
}

export function OrderParticipantsSkeleton({
  count = SKELETON_PARTICIPANT_COUNT,
}: OrderParticipantsSkeletonProps) {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-6 w-32" />
      <div className="flex items-start gap-12">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="inline-flex flex-col items-center gap-1">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-3 w-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrderDetailSkeleton() {
  return (
    <div
      role="status"
      aria-label="배달팟 정보를 불러오는 중"
      className="flex flex-col px-5 pb-8"
    >
      <div className="flex flex-col gap-xxl">
        <div className="flex flex-col">
          <div className="flex h-16 items-center gap-2">
            <Skeleton className="size-12 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-2/3" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-xl">
        <div className="-mx-5 h-px bg-divider-1" />

        <OrderParticipantsSkeleton />
      </div>
    </div>
  );
}
