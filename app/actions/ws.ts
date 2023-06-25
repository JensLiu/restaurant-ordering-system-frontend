import { apiBaseDomainName } from "./axios";

export const getWebsocket = (token: string) => {
    const wsUrl = `ws${
        process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production" && "s"
    }://${apiBaseDomainName}/ws/notifications/${token}`;
    return new WebSocket(wsUrl);
};
