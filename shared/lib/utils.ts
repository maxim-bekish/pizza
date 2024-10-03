import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function to conditionally join multiple class names together.
 * This is similar to clsx, but uses twMerge to merge Tailwind classes.
 * @param inputs - The class names to conditionally join.
 * @returns A single class name that is the result of joining the inputs.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
