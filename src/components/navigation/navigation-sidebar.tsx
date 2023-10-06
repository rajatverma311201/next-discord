import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ThemeToggle } from "@/components";
import { NavigationAction, NavigationItem } from ".";

interface NavigationSidebarProps {
    servers: any[];
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
    servers,
}) => {
    return (
        <div className="flex h-full w-full flex-col items-center space-y-4 bg-[#E3E5E8] py-3 text-primary dark:bg-[#1E1F22]">
            <NavigationAction />
            <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
            <ScrollArea className="w-full flex-1">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
                <ThemeToggle />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-[48px] w-[48px]",
                        },
                    }}
                />
            </div>
        </div>
    );
};
