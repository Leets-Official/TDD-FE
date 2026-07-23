import ProfileImg from "@/assets/icons/ProfileIcon.svg?react";
import { Button } from "@/components/button/Button";

export interface ProfileCardProps {
  nickname: string;
  profileImageUrl?: string;
  mannerTemperature: number;
  dormitory: string;
}

export function ProfileCard({
  nickname,
  profileImageUrl,
  mannerTemperature,
  dormitory,
}: ProfileCardProps) {
  return (
    <div className="flex w-full flex-col gap-4.5 rounded-lg px-5 py-6 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex gap-2.5">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={nickname}
              className="size-15 rounded-full object-cover"
            />
          ) : (
            <ProfileImg className="size-15" />
          )}
          <div className="flex flex-col">
            <p className="text-label text-black">{nickname}</p>
            <span className="text-caption-1 text-text-4">{dormitory}</span>
          </div>
        </div>
        <Button variant="outline" type="button" size="small">
          프로필 수정
        </Button>
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-m font-bold text-primary">
          {mannerTemperature}℃
          <span className="px-1 text-xs leading-s text-text-3">트뜨 지수</span>
        </p>
        <div className="h-3 w-full overflow-hidden rounded-[4px] bg-bg-temperature">
          <div
            className="h-full rounded-[4px] bg-primary"
            style={{
              width: `${Math.min(100, Math.max(0, (mannerTemperature / 70) * 100))}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
