import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";
import { classNames } from "~/lib/utils";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  name: string;
  label: string;
  includeBlank?: boolean;
  description?: string;
  fieldError?: string | null | undefined;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { name, label, includeBlank, description, fieldError, children, ...props },
    ref
  ) => {
    return (
      <div>
        <label
          htmlFor={name}
          className={classNames(
            "text-lg font-medium text-zinc-900",
            props.disabled && "pointer-events-none opacity-50"
          )}
        >
          {label}
        </label>
        <div className="mt-1">
          <select
            {...props}
            ref={ref ?? null}
            id={name}
            name={name}
            defaultValue={includeBlank ? "" : props.defaultValue}
            aria-invalid={fieldError ? true : props["aria-invalid"]}
            aria-describedby={`${name}-error ${name}-description`}
            className={classNames(
              "w-full cursor-pointer rounded border-2 border-black bg-white p-3 text-lg font-medium transition duration-100 placeholder:font-normal placeholder:text-zinc-300 focus:border-pink-700 focus:outline-none focus:ring-0",
              props.disabled && "pointer-events-none opacity-50",
              fieldError && "focus:border-red-600 focus:ring-red-600",
              props.className
            )}
          >
            {includeBlank && (
              <option disabled={props.required} value=""></option>
            )}
            {children}
          </select>
          {description && !fieldError && (
            <p id={`${name}-description`} className="mt-1 text-zinc-700">
              {description}
            </p>
          )}
          {fieldError && (
            <p className="pt-1 text-red-700" id={`${name}-error`}>
              {fieldError}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
