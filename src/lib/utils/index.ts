import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kiqi-8f9k.onrender.com/api/v1";