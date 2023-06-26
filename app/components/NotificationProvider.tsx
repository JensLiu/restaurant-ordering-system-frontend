"use client";
import { useWebSocketStore } from "../hooks/useWebSocketStore";
import useUserStore from "../hooks/useUserStore";
import { FC, use, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getWebsocket } from "../actions/ws";

interface NotificationProviderProps {
    children?: React.ReactNode;
}

export function showNotification(provider: () => Notification) {
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications!");
    } else if (Notification.permission === "granted") {
        provider();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission((permission) => {
            if (permission === "granted") {
                provider();
            }
        });
    }
}

const orderCallback = (message: any) => {
    const user = useUserStore.getState();
    if (user.role == "CUSTOMER") {
        if (message.orderStatus == "PREPARING") {
            toast.success("Your order is being prepared");
            showNotification(() => new Notification("Order is being prepared"));
        } else if (message.orderStatus == "READY") {
            toast.success("Your order is ready for pickup");
            showNotification(() => new Notification("Order is ready"));
        }
    } else if (user.role == "CHEF") {
        if (message.orderStatus === "WAITING") {
            toast.success("New order is waiting for you");
            showNotification(() => new Notification("New order"));
        }
    }
};

const messageCallback = (message: any) => {
    toast.success("You have a new message");
    showNotification(() => new Notification("New message"));
};

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
    const user = useUserStore.getState();
    const wsStore = useWebSocketStore();
    useEffect(() => {
        if (user.accessToken === "") {
            // console.log("no access token, no websocket");
            return;
        }
        // console.log(
        //     "access token changes, restablish websocket",
        //     userStore.accessToken
        // );

        wsStore.setSocket(getWebsocket(user.accessToken));
        wsStore.addOrderCallback(orderCallback);
        wsStore.addMessageCallback(messageCallback);

        return () => {
            wsStore.removeMessageCallback(orderCallback);
            wsStore.removeOrderCallback(messageCallback);
            wsStore.closeSocket();
        };
    }, [user]);

    return <>{children}</>;
};

export default NotificationProvider;
