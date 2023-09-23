import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
async function SetupPage() {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (server) {
        // if the user is already in a server, redirect them to that server
        return redirect(`/servers/${server.id}`);
    }

    return <div>Create Server</div>;
}

export default SetupPage;
