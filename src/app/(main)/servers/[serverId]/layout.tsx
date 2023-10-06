import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ServerSidebar } from "@/components/server";

interface ServerIdLayoutProps {
    children: React.ReactNode;
    params: { serverId: string };
}

const ServerIdLayout: React.FC<ServerIdLayoutProps> = async ({
    children,
    params,
}) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (!server) {
        return redirect("/");
    }

    return (
        <div className="h-full">
            <div className="invisible fixed inset-y-0 z-20 h-full w-60 flex-col md:visible md:flex">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">{children}</main>
        </div>
    );
};

export default ServerIdLayout;
