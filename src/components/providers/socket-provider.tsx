"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInitializer = async () => {
            console.log("Initializing socket...");
            await fetch("/api/socket/io");
            const socketInstance = ClientIO();

            console.log("Connecting to socket...");

            console.log({ socketInstance: socketInstance });
            socketInstance.on("connect", () => {
                console.log("Connected to socket.");
                setIsConnected(true);
            });

            socketInstance.on("disconnect", () => {
                setIsConnected(false);
            });

            setSocket(socketInstance as any);
        };

        socketInitializer();

        return () => {
            ClientIO().disconnect();
        };
    }, []);

    useEffect(() => {
        console.log({ isConnected });
    }, [isConnected]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
