import { Order } from "@/types/OrderTypes";
import { apiBaseUrl, paymentSuccessUrl } from "./default";
import axiosInstance from "./axios";

export const checkOutById = async (
    id: string
): Promise<{ redirectUrl: string }> => {
    return (
        await axiosInstance.post(`/api/v1/checkout/${id}`, {
            successUrl: paymentSuccessUrl,
            cancelUrl: paymentSuccessUrl,
        })
    ).data;
};

export const getOrdersForCurrentUser = async (): Promise<Order[]> => {
    const response = await axiosInstance.get("/api/v1/me/orders");
    console.log(response)
    return response.data;
};

export const getChefOrders = async (): Promise<Order[]> => {
    return (await axiosInstance.get("/api/v1/chef/orders")).data;
};

export const orderCheckout = async (data: any): Promise<{ redirectUrl: string }> => {
    return (await axiosInstance.post("/api/v1/checkout", data)).data;
};
