import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getChannelKey = (channelId: string) =>
    `chat:${channelId}:messages`;
export const getQueryKey = (chatId: string) => `chat:${chatId}`;
export const getAddKey = (chatId: string) => `chat:${chatId}:messages`;
export const getUpdateKey = (chatId: string) =>
    `chat:${chatId}:messages:update`;
