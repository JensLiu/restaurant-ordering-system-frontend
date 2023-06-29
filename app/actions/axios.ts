import axios, { AxiosResponse } from "axios";
import useUserStore from "../hooks/useUserStore";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "./default";
import { getRefreshedTokens } from "./auth";

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
const refreshToken = async (currentRefreshToken: string) => {
    // console.log("refreshing token");
    const response = await getRefreshedTokens(currentRefreshToken);
    if (response) {
        // set refreshed tokens
        useUserStore.setState((state) => ({
            ...state,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
        }));
    }
};

const handleError = async (error: any) => {
    if (error.response?.status == 401) {
        if (!error.config._retry) {
            // console.log("refreshing token");
            error.config._retry = true;
            await refreshToken(useUserStore.getState().refreshToken);
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
    console.log(useUserStore.getState());
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
