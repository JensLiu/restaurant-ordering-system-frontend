import { MenuItem } from "@/types/MenuItem";
import axiosInstance from "./axios";

export async function getMenuItems(): Promise<MenuItem[]> {
    const items = (await axiosInstance.get("/api/v1/menu")).data;
    return items;
}