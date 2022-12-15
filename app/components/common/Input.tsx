import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { classNames } from "~/lib/utils";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  name: string;
  label: string;
  description?: string;
  fieldError?: string | null | undefined;
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, description, fieldError, hideLabel, ...props }, ref) => {
    const isDisabled = props.disabled || props.readOnly;
    return (
      <div className="w-full">
        <label
          htmlFor={name}
          className={classNames(
            "text-lg font-medium text-zinc-900",
            hideLabel && "sr-only",
            isDisabled && "pointer-events-none opacity-50"
          )}
        >
          {label} {props.required && "*"}
        </label>
        <div className={`${hideLabel ? "" : "mt-1"}`}>
          <input
            {...props}
            ref={ref ?? null}
            id={name}
            name={name}
            type={props.type ?? "text"}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={`${name}-error ${name}-description`}
            className={classNames(
              "w-full rounded border-2 border-black bg-white p-3 text-lg font-medium transition duration-100 placeholder:font-normal placeholder:text-zinc-300 focus:border-pink-700 focus:outline-none focus:ring-0",
              isDisabled && "pointer-events-none opacity-50",
              fieldError && "focus:border-red-600 focus:ring-red-600",
              props.className
            )}
          />
          {description && !fieldError && (
            <p
              id={`${name}-description`}
              className="mt-1 text-base text-zinc-700"
            >
              {description}
            </p>
          )}
          {fieldError && (
            <p
              className="pt-1 pl-1 text-sm font-medium text-red-700"
              id={`${name}-error`}
            >
              {fieldError}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
