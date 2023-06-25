import { Order } from "@/types/OrderTypes";
import axiosInstance, { apiBaseUrl } from "./axios";

export const checkOutById = async (
    id: string
): Promise<{ redirectUrl: string }> => {
    return (
        await axiosInstance.post(`/api/v1/checkout/${id}`, {
            successUrl: `${apiBaseUrl}/me/orders`,
            cancelUrl: `${apiBaseUrl}/me/orders`,
        })
    ).data;
};

export const getOrdersForCurrentUser = async (): Promise<Order[]> => {
    return (await axiosInstance.get("/api/v1/me/orders")).data;
};

export const getChefOrders = async (): Promise<Order[]> => {
    return (await axiosInstance.get("/api/v1/chef/orders")).data;
};

export const orderCheckout = async (data: any): Promise<{ redirectUrl: string }> => {
    return (await axiosInstance.post("/api/v1/checkout", data)).data;
};
