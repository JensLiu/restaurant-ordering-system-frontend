import { Role } from "@/types/UserTypes";
import axiosInstance from "./axios";
import axios from "axios";
import { apiBaseUrl } from "./default";
import useUserStore from "../hooks/useUserStore";
import toast from "react-hot-toast";

const LOGIN_API = "/auth/login";
const SIGNUP_API = "/auth/register";

export type LoginRequest = {
    email: string;
    password: string;
};

export type SignUpRequest = LoginRequest & {
    firstname: string;
    lastname: string;
};

export type TokenRefreshResponse = {
    accessToken: string;
    refreshToken: string;
};

export type AuthResponse = TokenRefreshResponse & {
    id: string;
    email: string;
    role: Role;
    firstname: string;
    lastname: string;
    imageSrc?: string;
};

export const singUp = async (
    request: SignUpRequest
): Promise<AuthResponse | undefined> => {
    try {
        const response = await axiosInstance.post(SIGNUP_API, {
            email: request.email,
            password: request.password,
            firstname: request.firstname,
            lastname: request.lastname,
        });
        return response.data as AuthResponse;
    } catch (error) {}
};

export const signIn = async (
    request: LoginRequest
): Promise<AuthResponse | undefined> => {
    try {
        const response = await axiosInstance.post(LOGIN_API, {
            email: request.email,
            password: request.password,
        });
        return response.data as AuthResponse;
    } catch (error) {}
};

export const getCurrentUser = async (): Promise<AuthResponse | undefined> => {
    try {
        const response = await axiosInstance.get("/api/v1/users/me");
        return response.data as AuthResponse;
    } catch (error) {}
};

export const getRefreshedTokens = async (
    currentRefreshToken: string
): Promise<TokenRefreshResponse | undefined> => {
    try {
        const response = await axios.post(
            `${apiBaseUrl}/auth/refresh`,
            {}, // placeholder for empty request body
            {
                headers: {
                    Authorization: `Bearer ${currentRefreshToken}`,
                },
            }
        );
        return response.data.data as TokenRefreshResponse;
    } catch (error) {
        console.log("refresh token failed", error);
        if (toast) {
            toast.error("You are not signed in.");
            useUserStore.getState().signOut();
        }
    }
};

// export const validateUser = async (token: string): Promise<boolean> => {
//     return true;
// }
