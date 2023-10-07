import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

export const config = {
    api: {
        bodyParser: false,
    },
};

const socketHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (res.socket.server.io) {
        console.log("Socket is already running");
    } else {
        console.log("Socket is initializing");
        const io = new ServerIO(res.socket.server as any as NetServer);
        res.socket.server.io = io;
    }
    res.end();
};

export default socketHandler;
