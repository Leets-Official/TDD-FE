import { Skeleton } from "@/components/skeleton/Skeleton";

export function MyPageSkeleton() {
  return (
    <div
      role="status"
      aria-label="마이 페이지를 불러오는 중"
      className="mt-4.5 flex flex-col gap-6 px-5"
    >
      <div className="flex w-full flex-col gap-4.5 rounded-lg px-5 py-6 shadow-card">
        <div className="flex items-start justify-between">
          <div className="flex gap-2.5">
            <Skeleton className="size-[60px] rounded-full" />
            <div className="flex flex-col gap-1.5 pt-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-14" />
            </div>
          </div>
          <Skeleton className="h-8 w-[74px] rounded-full" />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-full rounded-[4px]" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 rounded-lg bg-white px-4 py-6 shadow-card">
        <Skeleton className="h-4 w-28" />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-40" />
          </div>
          <Skeleton className="size-6 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center justify-between p-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="size-6 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
