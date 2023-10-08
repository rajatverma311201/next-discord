import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getChatKey = (channelId: string) => `chat:${channelId}:messages`;
export const getQueryKey = (id: string) => `chat:${id}`;
export const getAddKey = (id: string) => `chat:${id}:messages`;
export const getUpdateKey = (id: string) => `chat:${id}:messages:update`;
