import type { ComponentPropsWithoutRef } from "react";
import { classNames } from "~/lib/utils";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
}

const buttonStyles = {
  base: "inline-flex w-full justify-center rounded border-2 border-black py-3 px-5 text-lg font-medium sm:w-auto select-none",
  primary: "text-white bg-pink-700 enabled:hover:bg-pink-800",
  secondary: "text-black hover:bg-pink-700 hover:text-white bg-zinc-50",
};

export const Button = ({
  children,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      className={classNames(
        buttonStyles.base,
        buttonStyles[variant],
        props.className ?? ""
      )}
    >
      {children}
    </button>
  );
};
