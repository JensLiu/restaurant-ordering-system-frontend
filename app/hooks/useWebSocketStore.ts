import { create } from "zustand";
import { getWebsocket, startHeartBeat } from "../actions/ws";
import useUserStore from "./useUserStore";

export type Callbacks = {
    orderCallbacks: ((message: any) => void)[];
    messageCallback: ((message: any) => void)[];
};

export interface NotificationWsStore {
    socket?: WebSocket;
    callbacks: Callbacks;
    connect: (token: string) => void;
    send: (message: any) => void;
    close: () => void;
    addOrderCallback: (callback: (message: any) => void) => void;
    addMessageCallback: (callback: (message: any) => void) => void;
    removeOrderCallback: (callback: (message: any) => void) => void;
    removeMessageCallback: (callback: (message: any) => void) => void;
}

export const useWebSocketStore = create<NotificationWsStore>((set, get) => ({
    socket: undefined,
    callbacks: {
        orderCallbacks: [],
        messageCallback: [],
    },
    connect: (token: string) => {
        if (token === "") {
            console.log("no access token, no websocket");
            return;
        }

        const socket = getWebsocket(token);

        socket.onopen = () => {
            console.log("socket opened");
        };

        // NOTE: cannot extract callback from get() because
        //       the adress of the callback will change

        socket.onmessage = (ev: MessageEvent) => {
            const callbacks = get().callbacks;
            console.log(ev);
            const data = JSON.parse(ev.data);
            // console.log(data);
            // console.log(callbacks);
            if (data.type == "ORDER") {
                callbacks.orderCallbacks.forEach((cb) => cb(data));
            } else if (data.type == "MESSAGE") {
                callbacks.messageCallback.forEach((cb) => cb(data));
            }
        };

        socket.onclose = (ev: CloseEvent) => {
            console.log(ev);
        };

        socket.onerror = (ev: Event) => {
            console.log(ev);
        };

        startHeartBeat(socket);

        // set socket
        set({ socket });
    },
    close: () => {
        console.log("closing socket");
        get().socket?.close();
        set((state) => ({
            socket: undefined,
        }));
    },
    send: (message: any) => {
        get().socket?.send(JSON.stringify(message));
    },
    addOrderCallback: (callback) => {
        // console.log("add order callback", callback);
        set((state) => {
            if (state.callbacks.orderCallbacks.includes(callback))
                return { ...state };
            return {
                callbacks: {
                    ...state.callbacks,
                    orderCallbacks: [
                        ...state.callbacks.orderCallbacks,
                        callback,
                    ],
                },
            };
        });
        // console.log("current callbacks", get().callbacks);
    },
    addMessageCallback(callback) {
        // console.log("add message callback", callback);
        set((state) => ({
            callbacks: {
                ...state.callbacks,
                messageCallback: [...state.callbacks.messageCallback, callback],
            },
        }));
        // console.log("current callbacks", get().callbacks);
    },
    removeMessageCallback(callback) {
        // console.log("remove message callback", callback);
        // console.log("previous callbacks", get().callbacks);
        set((state) => ({
            callbacks: {
                ...state.callbacks,
                messageCallback: state.callbacks.messageCallback.filter(
                    (cb) => cb !== callback
                ),
            },
        }));
        // console.log("current callbacks", get().callbacks);
    },
    removeOrderCallback(callback) {
        // console.log("remove order callback", callback);
        // console.log("previous callbacks", get().callbacks);
        set((state) => ({
            callbacks: {
                ...state.callbacks,
                orderCallbacks: state.callbacks.orderCallbacks.filter(
                    (cb) => cb !== callback
                ),
            },
        }));
        // console.log("current callbacks", get().callbacks);
    },
}));
