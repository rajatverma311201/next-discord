"use client";

import { useEffect, useState } from "react";

import {
    CreateChannelModal,
    CreateServerModal,
    DeleteChannelModal,
    EditServerModal,
    EditChannelModal,
    InviteModal,
    MembersModal,
    LeaveServerModal,
    DeleteServerModal,
} from "@/components/modals";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateChannelModal />
            <CreateServerModal />
            <DeleteChannelModal />
            <DeleteServerModal />
            <EditServerModal />
            <EditChannelModal />
            <InviteModal />
            <LeaveServerModal />
            <MembersModal />
            {/* 
            <MessageFileModal />
            <DeleteMessageModal />
             */}
        </>
    );
};
