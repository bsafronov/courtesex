import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUsernameInitials(username: string) {
  return username.toUpperCase().slice(0, 2);
}
