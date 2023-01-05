import { Link as RemixLink } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";
import { classNames } from "~/lib/utils";

export const Link = ({ to, ...props }: RemixLinkProps) => {
  return (
    <RemixLink
      to={to}
      {...props}
      className={classNames(
        props.className ?? "",
        "touch-manipulation rounded font-medium text-pink-700 underline decoration-transparent decoration-2 underline-offset-4 transition duration-75 hover:decoration-pink-700 focus:outline-none focus:ring-offset-2 focus-visible:decoration-transparent focus-visible:ring-2 focus-visible:ring-pink-700"
      )}
    >
      {props.children}
    </RemixLink>
  );
};
