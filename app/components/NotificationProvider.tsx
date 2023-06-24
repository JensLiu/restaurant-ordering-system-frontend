"use client";
import { useWebSocketStore } from "../hooks/useWebSocketStore";
import useUserStore from "../hooks/useUserStore";
import { FC, use, useEffect } from "react";
import { toast } from "react-hot-toast";

interface NotificationProviderProps {
    children?: React.ReactNode;
}

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
    const userStore = useUserStore();
    const wsStore = useWebSocketStore();
    useEffect(() => {
        if (userStore.accessToken === "") {
            console.log("no access token, no websocket");
            return;
        }
        console.log(
            "access token changes, restablish websocket",
            userStore.accessToken
        );
        wsStore.setSocket(
            new WebSocket(
                "ws://localhost:8080/ws/notifications/" + userStore.accessToken
            )
        );

        // TODO: remove later
        wsStore.addOrderCallback((message) => {
            toast.success("Your order is completed");
        });

        return wsStore.closeSocket;
    }, [userStore]);

    return <>{children}</>;
};

export default NotificationProvider;
