import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskString(
  text: string,
  options?: {
    startingLength: number;
    lastLength: number;
    staticMaskLength?: number;
  },
) {
  const startingLength = options?.startingLength ?? 2;
  const lastLength = options?.lastLength ?? 2;
  const staticMaskLength = options?.staticMaskLength;
  const mask = "*".repeat(text.length - (startingLength + lastLength));
  if (staticMaskLength)
    return (
      "*".repeat(staticMaskLength) +
      text.substring(0, startingLength) +
      text.substring(text.length - lastLength)
    );
  return (
    text.substring(0, startingLength) +
    mask +
    text.substring(text.length - lastLength)
  );
}
