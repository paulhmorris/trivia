import type { ComponentPropsWithoutRef } from "react";
import { classNames } from "~/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary: "text-white bg-pink-700 enabled:hover:bg-pink-800 border-black",
  secondary:
    "text-black hover:bg-pink-700 hover:text-white bg-zinc-50 border-black",
  ghost: "text-pink-700 bg-transparent hover:bg-pink-100 border-transparent",
};

const buttonSizeStyles: Record<ButtonSize, string> = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-4 py-2 text-base",
  xl: "px-6 py-3 text-base",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      className={classNames(
        "inline-flex w-full select-none items-center justify-center gap-2 whitespace-nowrap rounded border-2 py-3 px-5 text-lg font-medium disabled:pointer-events-none disabled:touch-none disabled:opacity-50 sm:w-auto",
        buttonSizeStyles[size],
        buttonVariantStyles[variant],
        props.className ?? ""
      )}
    >
      {children}
    </button>
  );
};
