import { create } from "zustand";
import { AuthResponse, signIn, singUp } from "../actions/getAuth";

export type UserRole = "CUSTOMER" | "CHEF" | "ADMIN";

interface UserState {
    email: string;
    role: string;
    firstname: string;
    lastname: string;
    imageSrc: string;
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
}

const storeToLocalStorage = (itemId: string, itemValue: string) => {
    // using window prevents error in server side rendering!!

    // if (typeof window !== "undefined") {
    localStorage.setItem(itemId, itemValue);
    // }
};

const getFromLocalStorage = (itemId: string): string => {
    // if (typeof window !== "undefined") {
    const item = localStorage.getItem(itemId);
    return item ? item : "";
    // }
    // return "";
};

const storeToCookie = (itemId: string, itemValue: string) => {

}

const useUserState = create<UserState>()((set) => ({
    email: getFromLocalStorage("email"),
    role: getFromLocalStorage("role"),
    firstname: getFromLocalStorage("firstname"),
    lastname: getFromLocalStorage("lastname"),
    imageSrc: getFromLocalStorage("imageSrc"),
    signUp: async (
        email: string,
        password: string,
        firstname: string,
        lastname: string,
        callback?: (message: any) => void
    ) => {
        const response = await singUp({
            email,
            password,
            firstname,
            lastname,
        });
        if (response) {
            storeToLocalStorage("email", response.email);
            storeToLocalStorage("role", response.role);
            storeToLocalStorage("firstname", response.firstname);
            storeToLocalStorage("lastname", response.lastname);
            storeToLocalStorage(
                "imageSrc",
                response.imageSrc ? response.imageSrc : ""
            );
            storeToLocalStorage("accessToken", response.accessToken);
            storeToLocalStorage("refreshToken", response.refreshToken);
            set(() => ({
                email: response.email,
                role: response.role,
                firstname: response.firstname,
                lastname: response.lastname,
                imageSrc: response.imageSrc,
            }));
            callback && callback(true);
            return;
        }
        callback && callback(false);
    },
    signIn: async (
        email: string,
        password: string,
        callback?: (message: any) => void
    ) => {
        const response = await signIn({ email, password });
        if (response) {
            storeToLocalStorage("email", response.email);
            storeToLocalStorage("role", response.role);
            storeToLocalStorage("firstname", response.firstname);
            storeToLocalStorage("lastname", response.lastname);
            storeToLocalStorage(
                "imageSrc",
                response.imageSrc ? response.imageSrc : ""
            );
            storeToLocalStorage("accessToken", response.accessToken);
            storeToLocalStorage("refreshToken", response.refreshToken);
            set(() => ({
                email: response.email,
                role: response.role,
                firstname: response.firstname,
                lastname: response.lastname,
                imageSrc: response.imageSrc,
            }));
            callback && callback(true);
            return;
        }
        callback && callback(false);
    },
    signOut: (callback?: (message: any) => void) => {
        storeToLocalStorage("email", "");
        storeToLocalStorage("role", "");
        storeToLocalStorage("firstname", "");
        storeToLocalStorage("lastname", "");
        storeToLocalStorage("imageSrc", "");
        set(() => ({
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            imageSrc: "",
        }));
        callback && callback(true);
    },
}));

export default useUserState;
