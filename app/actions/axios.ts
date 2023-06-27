import axios, { AxiosResponse } from "axios";
import useUserStore from "../hooks/useUserStore";
import { toast } from "react-hot-toast";

export const apiBaseDomainName =
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production"
        ? "necessary-soap-production.up.railway.app"
        : "localhost:8080";

export const websiteBaseDomainName =
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production"
        ? "ordering.jensdevelops.de"
        : "localhost:3000";

export const websiteBaseUrl = `http${
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production" ? "s" : ""
}://${websiteBaseDomainName}`;

export const apiBaseUrl = `http${
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production" ? "s" : ""
}://${apiBaseDomainName}`;

export const paymentSuccessUrl = `${websiteBaseUrl}/me/orders`;
export const paymentCancelUrl = `${websiteBaseUrl}/me/orders`;

// client side instance that needs auth header and can refresh token on 401
const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
});

// public instance does not need auth header, and can be used in server side rendering
export const axiosPublicInstance = axios.create({
    baseURL: apiBaseUrl,
});

const unwrapDto = (response: AxiosResponse) => {
    // unwrap the data from the response
    // with json like { message: "success", data: { ... } }
    // to { ... }
    if (response.data.data && response.data.message) {
        // console.log("handling wrapper");
        // console.log("before", response.data);
        const res = {
            ...response,
            data: response.data.data,
        };
        // console.log("after", res.data);
        return res;
    }
    // console.log("not handling wrapper", response.data);
    return response;
};

export function handleResponseWrapper(response: AxiosResponse) {
    if (response.data.message == "success") {
        return response.data.data;
    } else if (response.data.message == "failed" && toast) {
        toast.error(response.data.data.message);
    }
}

/**
 * Add a request interceptor to handle the refresh token
 * credit: porone at stackoverflow
 *
 */
const refreshToken = async () => {
    // console.log("refreshing token");
    const refreshToken = useUserStore.getState().refreshToken;
    try {
        const response = await axios.post(
            `${apiBaseUrl}/auth/refresh`,
            {}, // placeholder for empty request body
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );
        // set refreshed tokens
        useUserStore.setState((state) => ({
            ...state,
            accessToken: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken,
        }));
        // console.log(
        //     "updated access token",
        //     useUserStore.getState().accessToken
        // );
        // console.log(
        // "updated refresh token",
        // useUserStore.getState().refreshToken
        // );
    } catch (error) {
        // console.log("refresh token failed", error);
        if (toast) {
            toast.error("You are not signed in.");
            useUserStore.getState().signOut();
        }
    }
};

const handleError = async (error: any) => {
    if (error.response?.status == 401) {
        if (!error.config._retry) {
            // console.log("refreshing token");
            error.config._retry = true;
            await refreshToken();
            return axiosInstance(error.config);
        }
        return Promise.reject(error);
    } else if (toast && error.response?.data?.data?.message) {
        // show error message if available (not serverside)
        // with json like { message: "failed", data: { message: "...", timestamp: "..." } }
        toast.error(error.response?.data?.data?.message);
        return Promise.resolve(error);
    }
    return Promise.reject(error);
};

axiosInstance.interceptors.request.use((config) => {
    // console.log("intercepting request");
    const token = useUserStore.getState().accessToken; // use getState() in zustand, not hooks
    // console.log("added token", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => unwrapDto(response),
    async (error) => {
        await handleError(error);
    }
);

axiosPublicInstance.interceptors.response.use((response) =>
    unwrapDto(response)
);

export default axiosInstance;
