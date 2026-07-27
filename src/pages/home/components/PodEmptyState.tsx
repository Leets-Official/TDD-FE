import { Fab } from "@/components/fab/Fab";

import EmptyPodsImage from "@/assets/EmptyPods.png";

export interface PodEmptyStateProps {
  onCreateClick: () => void;
}

export function PodEmptyState({ onCreateClick }: PodEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-8 px-xl pt-16">
      <img src={EmptyPodsImage} alt="" className="size-37.5" />
      <div className="flex flex-col items-center gap-l text-center">
        <p className="text-title-1 text-text-1">
          현재 활성화된 배달팟이 없어요
        </p>
        <p className="text-body-1 text-text-2">
          같은 기숙사 사람들과 함께 주문하고
          <br />
          배달비를 아껴보세요
        </p>
      </div>
      <Fab label="배달팟 만들기" onClick={onCreateClick} />
    </div>
  );
}
