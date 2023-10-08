"use client";
import { Member, Profile } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import * as z from "zod";

interface ChatItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile;
    };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />,
    ADMIN: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
};

const formSchema = z.object({
    content: z.string().min(1),
});

import React, { useState } from "react";
import { useModal } from "@/hooks";
import { useParams, useRouter } from "next/navigation";

export const ChatItem: React.FC<ChatItemProps> = ({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketUrl,
    socketQuery,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();

    return <div>ChatItem</div>;
};
