import { useState, type ComponentPropsWithRef } from "react";

import { type VariantProps } from "@/utils/cn";

import UserIcon from "@/assets/icons/UserIcon.svg?react";

import { avatarVariants } from "./Avatar.variants";

export interface AvatarProps
  extends
    Omit<ComponentPropsWithRef<"span">, "children">,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt: string;
}

export function Avatar({ src, alt, size, className, ...props }: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string>();

  const styles = avatarVariants({ size });
  const showFallback = !src || failedSrc === src;

  return (
    <span className={styles.root({ className })} {...props}>
      {showFallback ? (
        <>
          <UserIcon className={styles.fallbackIcon()} aria-hidden="true" />
          <span className="sr-only">{alt}</span>
        </>
      ) : (
        <img
          src={src}
          alt={alt}
          className={styles.image()}
          onError={() => setFailedSrc(src)}
        />
      )}
    </span>
  );
}
