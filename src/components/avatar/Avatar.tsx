import { useState, type ComponentPropsWithRef } from "react";

import { type VariantProps } from "@/utils/cn";

import ProfileIcon from "@/assets/icons/ProfileIcon.svg?react";

import { avatarVariants } from "./Avatar.variants";

type AvatarBaseProps = Omit<ComponentPropsWithRef<"span">, "children"> &
  VariantProps<typeof avatarVariants>;

export type AvatarProps =
  | (AvatarBaseProps & { empty?: false; src?: string; alt: string })
  | (AvatarBaseProps & { empty: true });

export function Avatar(props: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const styles = avatarVariants({ size: props.size });

  if (props.empty) {
    const { empty, size, className, ...rest } = props;
    return (
      <span
        aria-hidden="true"
        className={styles.empty({ className })}
        {...rest}
      />
    );
  }

  const { empty, size, className, src, alt, ...spanProps } = props;
  const showFallback = !src || failedSrc === src;

  return (
    <span className={styles.root({ className })} {...spanProps}>
      {showFallback ? (
        <>
          <ProfileIcon className="size-full" aria-hidden="true" />
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
