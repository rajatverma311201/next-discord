import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <Button>HELLO WORLD</Button>
            <UserButton afterSignOutUrl="/" />
            <ThemeToggle />
        </div>
    );
}
