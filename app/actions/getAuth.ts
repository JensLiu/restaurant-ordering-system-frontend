import axios from "axios";

const LOGIN_API = "http://localhost:8080/api/v1/auth/authenticate";
const SIGNUP_API = "http://localhost:8080/api/v1/auth/signup";

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
    email: string;
    role: string;
    firstname: string;
    lastname: string;
    imageSrc?: string;
};

export async function singUp(
    request: SignUpRequest
): Promise<AuthResponse | null> {
    try {
        const response = (await axios.post(SIGNUP_API, {
            email: request.email,
            password: request.password,
            firstname: request.firstname,
            lastname: request.lastname,
        })).data as AuthResponse;
        return response;
    } catch (error) {
        return null;
    }
}

export async function signIn(
    request: LoginRequest
): Promise<AuthResponse | null> {
    try {
        const response = (await axios.post(LOGIN_API, {
            email: request.email,
            password: request.password,
        })).data as AuthResponse;
        return response;
    } catch (error) {
        return null;
    }
}
