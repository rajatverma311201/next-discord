import { ChatHeader, ChatInput } from "@/components/chat";
import { currentProfile, db } from "@/lib";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    };
}

const ChannelIdPage: React.FC<ChannelIdPageProps> = async ({
    params: { channelId, serverId },
}) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id,
        },
    });

    if (!channel || !member) {
        redirect("/");
    }

    return (
        <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
            <ChatHeader
                serverId={serverId}
                name={channel.name}
                type="channel"
            />
            <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                }}
            />
        </div>
    );
};

export default ChannelIdPage;
