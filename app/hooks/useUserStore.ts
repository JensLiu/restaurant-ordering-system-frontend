import { create } from "zustand";
import { getCurrentUser, signIn, singUp } from "../actions/auth";
import { persist, createJSONStorage } from "zustand/middleware";
import { Role } from "@/types/UserTypes";
import { deleteCookie, setCookie, setCookies } from "cookies-next";
import { useWebSocketStore } from "./useWebSocketStore";

export type UserRole = "CUSTOMER" | "CHEF" | "ADMIN";

interface UserState {
    id: string;
    email: string;
    role: Role;
    firstname: string;
    lastname: string;
    imageSrc: string;
    accessToken: string;
    refreshToken: string;
    isAuthenticated: boolean;
    signIn: (
        email: string,
        password: string,
        callback?: (message: any) => void
    ) => void;
    signUp: (
        email: string,
        password: string,
        firstname: string,
        lastname: string,
        callback?: (message: any) => void
    ) => void;
    signOut: (callback?: (message: any) => void) => void;
    refreshData: () => void;
}

export const roleCookieName = "_app_role";

const wrapResponseDataAsState = (data: any) => {
    return {
        id: data.id,
        email: data.email,
        role: data.role,
        firstname: data.firstname,
        lastname: data.lastname,
        imageSrc: data.imageSrc,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
    };
};

const defaultState = {
    email: "",
    id: "",
    role: "CUSTOMER" as Role,
    firstname: "",
    lastname: "",
    imageSrc: "",
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
};

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            ...defaultState,
            signUp: async (email, password, firstname, lastname, callback) => {
                const response = await singUp({
                    email,
                    password,
                    firstname,
                    lastname,
                });
                if (response) {
                    set(wrapResponseDataAsState);
                    setCookies(roleCookieName, response.role);
                    callback && callback(true);
                    return;
                }
                callback && callback(false);
            },
            signIn: async (email, password, callback) => {
                const response = await signIn({ email, password });
                if (response) {
                    set(wrapResponseDataAsState(response));
                    setCookie(roleCookieName, response.role);
                    callback && callback(true);
                    return;
                }
                callback && callback(false);
            },
            signOut: (callback?: (message: any) => void) => {
                set(() => ({ ...defaultState }));
                deleteCookie(roleCookieName);
                useWebSocketStore.getState().close();
                callback && callback(true);
            },
            refreshData: async () => {
                const response = await getCurrentUser();
                set((state) => ({
                    ...state,
                    firstname: response?.firstname,
                    lastname: response?.lastname,
                    imageSrc: response?.imageSrc,
                }));
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserStore;
