import axios from "axios";
import { useCurrentUser } from "../hooks/useUserProfile";
import useUserStore from "../hooks/useUserStore";

const baseUrl = "http://localhost:8080";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    // withCredentials: true,
});

/**
 * Add a request interceptor to handle the refresh token
 * credit: porone at stackoverflow
 *
 */
const refreshToken = async () => {
    const refreshToken = useUserStore.getState().refreshToken;
    const response = await axios.post(
        "http://localhost:8080/auth/refresh", {}, // placeholder for empty request body
        {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        }
    );
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
            error.config._retry = true;
            await refreshToken();
            return axiosInstance(error.config);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
