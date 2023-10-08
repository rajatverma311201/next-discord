"use client";
import { Member, Message, Profile } from "@prisma/client";
import React, { Fragment } from "react";
import { ChatItem, ChatWelcome } from ".";
import { getAddKey, getQueryKey, getUpdateKey } from "@/lib";
import { useChatQuery } from "@/hooks";
import { Loader2, ServerCrash } from "lucide-react";
import { format } from "date-fns";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}

export function ChatMessages({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}: ChatMessagesProps) {
    const queryKey = getQueryKey(chatId);
    const addKey = getAddKey(chatId);
    const updateKey = getUpdateKey(chatId);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useChatQuery({
            queryKey,
            apiUrl,
            paramKey,
            paramValue,
        });

    if (status === "loading") {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading messages...
                </p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                <ServerCrash className="my-4 h-7 w-7 text-zinc-500" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Something went wrong!
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col overflow-y-auto py-4">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && <ChatWelcome type={type} name={name} />}

            <div className="mt-auto flex flex-col-reverse">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map(
                            (message: MessageWithMemberWithProfile) => (
                                <ChatItem
                                    key={message.id}
                                    id={message.id}
                                    currentMember={member}
                                    member={message.member}
                                    content={message.content}
                                    fileUrl={message.fileUrl}
                                    deleted={message.deleted}
                                    timestamp={format(
                                        new Date(message.createdAt),
                                        DATE_FORMAT,
                                    )}
                                    isUpdated={
                                        message.updatedAt !== message.createdAt
                                    }
                                    socketUrl={socketUrl}
                                    socketQuery={socketQuery}
                                />
                            ),
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
