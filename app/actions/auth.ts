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

export async function singUp(
    request: SignUpRequest
): Promise<AuthResponse | null> {
    try {
        const response = (
            await axiosInstance.post(SIGNUP_API, {
                email: request.email,
                password: request.password,
                firstname: request.firstname,
                lastname: request.lastname,
            })
        ).data as AuthResponse;
        return response;
    } catch (error) {
        return null;
    }
}

export async function signIn(
    request: LoginRequest
): Promise<AuthResponse | null> {
    try {
        const response = (
            await axiosInstance.post(LOGIN_API, {
                email: request.email,
                password: request.password,
            })
        ).data as AuthResponse;
        console.log(response);
        return response;
    } catch (error) {
        return null;
    }
}