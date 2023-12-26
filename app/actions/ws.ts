import { wsApiBaseUrl } from "./default";

export const getWebsocket = (token: string): WebSocket => {
    const wsUrl = `${wsApiBaseUrl}/ws/notifications/${token}`;
    
    console.log(wsUrl);

    return new WebSocket(wsUrl);
};

/**
 * the use of reverse proxy by nginx causes connection
 * to be closed within a certain time interval,
 * resulting in an unexpected closing of websocket
 *
 * we now use `startHeartBeat` to periodiclly send to the endpoint
 * a heartbeat message to keep the connection alive
 *
 */
export const startHeartBeat = (ws: WebSocket): NodeJS.Timer => {
    const timeoutInterval = 55 * 1000;
    const timer = setInterval(() => {
        if (ws && ws.readyState == 1) {
            console.log("sending heartbeat");
            ws.send(
                JSON.stringify({
                    type: "HEARTBEAT",
                })
            );
        } else {
            console.log("websocket disconnected! closing heartbeat");
            clearInterval(timer);
        }
    }, timeoutInterval);
    return timer;
};
