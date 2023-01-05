import type { Path } from "@remix-run/react";
import { Link } from "@remix-run/react";
import type { ComponentPropsWithoutRef } from "react";
import { classNames } from "~/lib/utils";

type ButtonLinkVariant = "primary" | "secondary" | "ghost";
type ButtonLinkSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonLinkProps extends ComponentPropsWithoutRef<"a"> {
  to: string | Partial<Path>;
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
}

const buttonVariantStyles: Record<ButtonLinkVariant, string> = {
  primary: "text-white bg-pink-700 hover:bg-pink-800 border-black",
  secondary:
    "text-black hover:bg-pink-700 hover:text-white bg-zinc-50 border-black",
  ghost: "text-pink-700 bg-transparent hover:bg-pink-100 border-transparent",
};

const buttonSizeStyles: Record<ButtonLinkSize, string> = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-4 py-2 text-base",
  xl: "px-6 py-3 text-base",
};

export const ButtonLink = ({
  children,
  to,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      {...props}
      to={to}
      type={props.type ?? "button"}
      className={classNames(
        "inline-flex w-full select-none items-center justify-center gap-2 whitespace-nowrap rounded border-2 py-3 px-5 text-lg font-medium sm:w-auto",
        buttonSizeStyles[size],
        buttonVariantStyles[variant],
        props.className ?? ""
      )}
    >
      {children}
    </Link>
  );
};
