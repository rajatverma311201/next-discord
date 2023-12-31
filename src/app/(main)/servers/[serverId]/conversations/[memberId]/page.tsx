import { MediaRoom } from "@/components";
import { ChatHeader, ChatInput, ChatMessages } from "@/components/chat";
import { currentProfile, db, getOrCreateConversation } from "@/lib";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface MemberIdPageProps {
    params: { serverId: string; memberId: string };
    searchParams: { video?: boolean };
}

const MemberIdPage: React.FC<MemberIdPageProps> = async ({
    params: { memberId, serverId },
    searchParams: { video },
}) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const currentMember = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile?.id,
        },
        include: {
            profile: true,
        },
    });

    if (!currentMember) {
        return redirect("/");
    }

    const conversation = await getOrCreateConversation(
        currentMember?.id as string,
        memberId,
    );

    if (!conversation) {
        console.log("No conversation found");
        return redirect(`/servers/${serverId}`);
    }

    const { memberOne, memberTwo } = conversation;

    const otherMember =
        memberOne.profileId === profile.id ? memberTwo : memberOne;

    return (
        <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
            <ChatHeader
                serverId={serverId}
                name={otherMember.profile?.name as string}
                type="conversation"
                imageUrl={otherMember.profile?.imageUrl as string}
            />

            {!video ? (
                <>
                    <ChatMessages
                        member={currentMember}
                        name={otherMember.profile.name}
                        chatId={conversation.id}
                        type="conversation"
                        apiUrl="/api/direct-messages"
                        paramKey="conversationId"
                        paramValue={conversation.id}
                        socketUrl="/api/socket/direct-messages"
                        socketQuery={{
                            conversationId: conversation.id,
                        }}
                    />
                    <ChatInput
                        name={otherMember.profile.name}
                        type="conversation"
                        apiUrl="/api/socket/direct-messages"
                        query={{
                            conversationId: conversation.id,
                        }}
                    />
                </>
            ) : (
                <>
                    <MediaRoom
                        chatId={conversation.id}
                        audio={true}
                        video={true}
                    />
                </>
            )}
        </div>
    );
};

export default MemberIdPage;
