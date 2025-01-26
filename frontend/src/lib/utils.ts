import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBackendApiUrl = () => {
  return `${process.env.NEXT_PUBLIC_BACKEND_API_URL}`;
};
