import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib";
import {
    // ModalProvider,
    SocketProvider,
    ThemeProvider,
} from "@/components/providers";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={cn(
                        font.className,
                        "bg-white text-accent-foreground dark:bg-[#313338]",
                    )}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        storageKey="next-discord-theme"
                    >
                        {/* <SocketProvider> */}
                        {/* <ModalProvider /> */}
                        {children}
                        {/* </SocketProvider> */}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout;
