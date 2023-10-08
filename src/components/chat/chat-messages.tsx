import { Member } from "@prisma/client";
import React from "react";
import { ChatWelcome } from ".";

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

const ChatMessages: React.FC<ChatMessagesProps> = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}) => {
    return (
        <div className="flex flex-1 flex-col overflow-y-auto py-4">
            <div className="flex-1" />
            <ChatWelcome name={name} type={type} />
        </div>
    );
};

export default ChatMessages;
