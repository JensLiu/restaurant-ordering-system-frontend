import { create } from "zustand";
import { signIn, singUp } from "../actions/getAuth";
import { persist, createJSONStorage } from "zustand/middleware";
import { Role } from "@/types/UserTypes";

export type UserRole = "CUSTOMER" | "CHEF" | "ADMIN";

export interface UserState {
    id: string;
    email: string;
    role: Role;
    firstname: string;
    lastname: string;
    imageSrc: string;
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
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            email: "",
            id: "",
            role: "CUSTOMER",
            firstname: "",
            lastname: "",
            imageSrc: "",
            isAuthenticated: false,
            signUp: async ( email, password, firstname, lastname, callback) => {
                const response = await singUp({ email, password, firstname, lastname });
                if (response) {
                    set(() => ({
                        id: response.id,
                        email: response.email,
                        role: response.role,
                        firstname: response.firstname,
                        lastname: response.lastname,
                        imageSrc: response.imageSrc,
                        isAuthenticated: true
                    }));
                    callback && callback(true);
                    return;
                }
                callback && callback(false);
            },
            signIn: async (email, password, callback ) => {
                const response = await signIn({ email, password });
                if (response) {
                    set(() => ({
                        id: response.id,
                        email: response.email,
                        role: response.role,
                        firstname: response.firstname,
                        lastname: response.lastname,
                        imageSrc: response.imageSrc,
                        isAuthenticated: true
                    }));
                    callback && callback(true);
                    return;
                }
                callback && callback(false);
            },
            signOut: (callback?: (message: any) => void) => {
                set(() => ({
                    id: "",
                    email: "",
                    password: "",
                    firstname: "",
                    lastname: "",
                    imageSrc: "",
                    isAuthenticated: false
                }));
                callback && callback(true);
            }
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useUserStore;
