import { NavigationSidebar } from "@/components/navigation";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = async ({ children }) => {
    return (
        <div className="h-full">
            <div className="pointer-events-none invisible fixed inset-y-0 z-30 flex h-full w-[72px] flex-col md:pointer-events-auto md:visible">
                <NavigationSidebar />
            </div>
            <main className="h-full md:pl-[72px]">{children}</main>
        </div>
    );
};

export default MainLayout;
