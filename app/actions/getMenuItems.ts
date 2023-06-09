import { MenuItem } from "@/types/MenuTypes";
import axiosInstance from "./axios";

export async function getMenuItems(): Promise<MenuItem[]> {
    console.log("getMenuItems")
    const items = (await axiosInstance.get("/api/v1/menu")).data;
    return items;
}

export async function getMenuItem(id: string): Promise<MenuItem> {
    const item = (await axiosInstance.get(`/api/v1/menu/${id}`)).data;
    return item;
}