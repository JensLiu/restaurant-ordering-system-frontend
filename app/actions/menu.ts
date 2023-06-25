import { MenuItem } from "@/types/MenuTypes";
import axiosInstance from "./axios";

// use public api to fetch at server side

export async function getMenuItems(): Promise<MenuItem[]> {
    const items = (await axiosInstance.get("/api/v1/public/menu")).data;
    return items;
}

export async function getMenuItem(id: string): Promise<MenuItem> {
    const item = (await axiosInstance.get(`/api/v1/public/menu/${id}`)).data;
    return item;
}