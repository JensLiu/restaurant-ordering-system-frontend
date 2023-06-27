import { Role } from "@/types/UserTypes";
import axiosInstance from "./axios";

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
}