import type { ComponentPropsWithRef } from "react";

import { type VariantProps } from "@/utils/cn";

import { Avatar } from "./Avatar";
import { avatarGroupVariants } from "./AvatarGroup.variants";

export interface AvatarGroupItem {
  src?: string;
  alt: string;
}

export interface AvatarGroupProps
  extends
    Omit<ComponentPropsWithRef<"div">, "children">,
    VariantProps<typeof avatarGroupVariants> {
  avatars: AvatarGroupItem[];
  /** 모집 정원. avatars가 이 수보다 적으면 빈 자리를 점선 원으로 채워 보여줍니다. */
  total?: number;
  max?: number;
}

export function AvatarGroup({
  avatars,
  total,
  max = 4,
  size = 24,
  className,
  ...props
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const overflowCount = avatars.length - visibleAvatars.length;
  const emptyCount =
    total !== undefined
      ? Math.max(0, Math.min(total, max) - visibleAvatars.length)
      : 0;

  const styles = avatarGroupVariants({ size });

  return (
    <div className={styles.root({ className })} {...props}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={`${avatar.alt}-${index}`}
          src={avatar.src}
          alt={avatar.alt}
          size={size}
          className={styles.avatar()}
        />
      ))}
      {Array.from({ length: emptyCount }, (_, index) => (
        <span
          key={`empty-${index}`}
          aria-hidden="true"
          className={styles.empty()}
        />
      ))}
      {overflowCount > 0 && (
        <span className={styles.overflow()}>+{overflowCount}</span>
      )}
    </div>
  );
}
