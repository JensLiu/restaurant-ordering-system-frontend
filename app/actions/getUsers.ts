import { User } from "@/types/UserTypes";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "./axios";
import { UserState } from "../hooks/useUserStore";

export async function getUsers(): Promise<User[]> {
    try {
        const response: AxiosResponse = await axiosInstance.get("/api/v1/users");
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error while fetching users")
    }
}

export async function getCurrentUser(): Promise<User> {
    try {
        const response: AxiosResponse = await axiosInstance.get("/api/v1/users/me");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Error while fetching user")
    }
}