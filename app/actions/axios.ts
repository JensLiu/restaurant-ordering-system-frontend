import axios from "axios";
import useUserStore from "../hooks/useUserStore";

export const apiBaseDomainName =
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production"
        ? "ordering-api.jensdevelops.de"
        : "localhost:8080";

export const apiBaseUrl = `http${
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME == "production" ? "s" : ""
}://${apiBaseDomainName}`;

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
});

export const axiosPublicInstance = axios.create({
    baseURL: apiBaseUrl,
})

/**
 * Add a request interceptor to handle the refresh token
 * credit: porone at stackoverflow
 *
 */
const refreshToken = async () => {
    const refreshToken = useUserStore.getState().refreshToken;
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
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
    }));
};

axiosInstance.interceptors.request.use((config) => {
    const token = useUserStore.getState().accessToken; // use getState() in zustand, not hooks
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            (error.response?.status == 401 || error.response?.status == 403) &&
            !error.config._retry
        ) {
            console.log("refreshing token")
            error.config._retry = true;
            await refreshToken();
            return axiosInstance(error.config);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
