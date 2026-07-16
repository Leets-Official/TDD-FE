import type { ComponentPropsWithRef } from "react";

import PlusIcon from "@/assets/icons/PlusIcon.svg?react";

import { fabVariants } from "./Fab.variants";

type FabBaseProps = Omit<ComponentPropsWithRef<"button">, "children">;

export type FabProps =
  | (FabBaseProps & { label: string })
  | (Omit<FabBaseProps, "aria-label"> & {
      label?: undefined;
      "aria-label": string;
    });

export function Fab({ label, className, ...props }: FabProps) {
  const styles = fabVariants({ hasLabel: !!label });

  return (
    <button type="button" className={styles.root({ className })} {...props}>
      <PlusIcon className={styles.icon()} aria-hidden="true" />
      {label && <span className={styles.label()}>{label}</span>}
    </button>
  );
}
