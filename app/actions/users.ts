import { User } from "@/types/UserTypes";
import { AxiosResponse } from "axios";
import axiosInstance from "./axios";

export const getUsers = async (): Promise<User[]> => {
    try {
        const response: AxiosResponse = await axiosInstance.get(
            "/api/v1/users"
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error while fetching users");
    }
};

export const getCurrentUser = async (): Promise<User> => {
    try {
        const response: AxiosResponse = await axiosInstance.get(
            "/api/v1/users/me"
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error while fetching user");
    }
};

export const updateUserData = async (data: any): Promise<User> => {
    // TODO: add type for data
    return (await axiosInstance.post("/api/v1/users/me", data)).data;
};
