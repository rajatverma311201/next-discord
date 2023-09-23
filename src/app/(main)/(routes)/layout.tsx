import { NavigationSidebar } from "@/components/navigation";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    return (
        <div className="h-full">
            <div className="invisible fixed inset-y-0 z-30 flex h-full w-[72px] flex-col md:visible">
                <NavigationSidebar servers={servers} />
            </div>
            <main className="h-full md:pl-[72px]">{children}</main>
        </div>
    );
};

export default MainLayout;
