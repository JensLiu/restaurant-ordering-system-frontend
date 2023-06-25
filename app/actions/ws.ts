import { apiBaseDomainName } from "./axios";

export const getWebsocket = (token: string) => {
    return new WebSocket(`ws://${apiBaseDomainName}/ws/notifications/${token}`);
};
