import { create } from "zustand";

export type Callbacks = {
    orderCallbacks: ((message: any) => void)[];
    messageCallback: ((message: any) => void)[];
};

export interface WebSocketStore {
    socket?: WebSocket;
    callbacks: Callbacks;
    setSocket: (socket: WebSocket) => void;
    send: (message: any) => void;
    closeSocket: () => void;
    addOrderCallback: (callback: (message: any) => void) => void;
    addMessageCallback: (callback: (message: any) => void) => void;
    removeOrderCallback: (callback: (message: any) => void) => void;
    removeMessageCallback: (callback: (message: any) => void) => void;
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
    socket: undefined,
    callbacks: {
        orderCallbacks: [],
        messageCallback: [],
    },
    setSocket: (socket: WebSocket) => {
        socket.onopen = () => {
            console.log("socket opened");
        };
        // set onmessage callback
        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log(data);
            const callbacks = get().callbacks;
            if (data.type == "ORDER") {
                callbacks.orderCallbacks.forEach((cb) => cb(data));
            } else if (data.type == "MESSAGE") {
                callbacks.messageCallback.forEach((cb) => cb(data));
            }
        };
        // set socket
        set({ socket });
    },
    closeSocket: () => {
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
        console.log("add order callback", callback);

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
    },
    addMessageCallback(callback) {
        console.log("add message callback", callback);
        set((state) => ({
            callbacks: {
                ...state.callbacks,
                messageCallback: [...state.callbacks.messageCallback, callback],
            },
        }));
        console.log("current callbacks", get().callbacks);
    },
    removeMessageCallback(callback) {
        console.log("remove message callback", callback);
        console.log("previous callbacks", get().callbacks);
        set((state) => ({
            callbacks: {
                ...state.callbacks,
                messageCallback: state.callbacks.messageCallback.filter(
                    (cb) => cb !== callback
                ),
            },
        }));
        console.log("current callbacks", get().callbacks);
    },
    removeOrderCallback(callback) {
        console.log("remove order callback", callback);
        console.log("previous callbacks", get().callbacks);
        set((state) => ({
            callbacks: {
                ...state.callbacks,
                orderCallbacks: state.callbacks.orderCallbacks.filter(
                    (cb) => cb !== callback
                ),
            },
        }));
        console.log("current callbacks", get().callbacks);
    },
}));
