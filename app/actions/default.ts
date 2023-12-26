import { Role } from "@/types/UserTypes";

// with http(s)://
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

// with ws(s)://
export const wsApiBaseUrl = process.env.NEXT_PUBLIC_WS_API_BASE_URL

export const websiteBaseUrl = process.env.NEXT_PUBLIC_WEBSITE_BASE_URL

export const paymentSuccessUrl = `${websiteBaseUrl}/me/orders`;
export const paymentCancelUrl = `${websiteBaseUrl}/me/orders`;

export const localUserStorekey = "user-store";
export const localCartStorekey = "cart-store";

export const getHomeUrlByRole = (role: Role) => {
    switch (role) {
        case "CUSTOMER":
            return "/home";
        case "CHEF":
            return "/chef";
        case "ADMIN":
            return "/admin";
    }
};

export const getFromLocalStorage = <T>(key: string): T | undefined => {
    const item = typeof window !== "undefined" ? window.localStorage.getItem(key) : "";
    if (item) {
        return JSON.parse(item);
    }
    return undefined;
}

export const getFromSessionStorage = <T>(key: string): T | undefined => {
    const item = typeof window !== "undefined" ? window.sessionStorage.getItem(key) : "";
    if (item) {
        return JSON.parse(item);
    }
    return undefined;
}