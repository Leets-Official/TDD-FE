import { Avatar } from "@/components/avatar/Avatar";

export interface PodHostProfileProps {
  nickname: string;
  temperature: number;
  src?: string;
}

export function PodHostProfile({
  nickname,
  temperature,
  src,
}: PodHostProfileProps) {
  return (
    <div className="flex h-16 items-center gap-2">
      <Avatar size={48} alt={nickname} src={src} />
      <div className="flex flex-col">
        <p className="text-body-2 text-text-1">{nickname}</p>
        <div className="flex items-center gap-1">
          <span className="text-label text-primary">{temperature}</span>
          <span className="text-caption-2 text-text-4">트뜨 지수</span>
        </div>
      </div>
    </div>
  );
}
