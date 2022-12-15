import type { KeyboardEvent } from "react";

export function enforceMaxLength(e: KeyboardEvent<HTMLInputElement>) {
  if (e.currentTarget.value.length >= e.currentTarget.maxLength) {
    e.preventDefault();
    e.stopPropagation();
  }
}
