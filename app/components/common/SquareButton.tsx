import type { ComponentPropsWithoutRef } from "react";
import { classNames } from "~/lib/utils";

export const SquareButton = ({
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      className={classNames(
        "inline-flex aspect-square h-8 w-8 select-none items-center justify-center whitespace-nowrap rounded border border-zinc-500 bg-white p-2 text-center text-lg font-bold shadow-sm hover:bg-zinc-100 disabled:pointer-events-none disabled:touch-none disabled:opacity-50",
        props.className ?? ""
      )}
    >
      {children}
    </button>
  );
};
