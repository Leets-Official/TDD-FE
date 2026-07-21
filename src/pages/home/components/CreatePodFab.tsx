import { Fab } from "@/components/fab/Fab";

export interface CreatePodFabProps {
  onClick: () => void;
}

export function CreatePodFab({ onClick }: CreatePodFabProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(24px+env(safe-area-inset-bottom))] z-10 mx-auto flex max-w-107.5 justify-end px-l">
      <Fab
        label="배달팟 만들기"
        onClick={onClick}
        className="pointer-events-auto"
      />
    </div>
  );
}
