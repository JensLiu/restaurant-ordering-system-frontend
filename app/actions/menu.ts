import { MenuItem, MenuItemCategory } from "@/types/MenuTypes";
import axiosInstance, { axiosPublicInstance } from "./axios";
import { MenuItemFormValues } from "../admin/menu/hooks/MenuItemForm";
import axios, { AxiosResponse } from "axios";

// use public api to fetch at server side
export const getMenuItems = async (): Promise<MenuItem[]> => {
    return (await axiosPublicInstance.get("/api/v1/public/menu")).data;
};

export const getMenuItem = async (id: string): Promise<MenuItem> => {
    return await axiosPublicInstance.get(`/api/v1/public/menu/${id}`);
};

export const deleteMenuItem = async (id: string): Promise<null> => {
    return await axiosInstance.delete(`/api/v1/menu/${id}`);
};

export const enableMenuItem = async (id: string): Promise<null> => {
    return await axiosInstance.put(`/api/v1/menu/${id}/enable`);
};

export const selloutMenuItem = async (id: string): Promise<null> => {
    return await axiosInstance.put(`/api/v1/menu/${id}/soldout`);
};

export const createMenuItem = async (
    data: MenuItemFormValues
): Promise<MenuItem> => {
    return await axiosInstance.post("/api/v1/menu", data);
};

export const updateMenuItem = async (
    data: MenuItemFormValues
): Promise<MenuItem> => {
    console.log(data);
    return await axiosInstance.post(`/api/v1/menu/${data.id}`, data);
};

export const getCategories = async (): Promise<MenuItemCategory[]> => {
    // TODO: use public api
    return (await axiosPublicInstance.get("/api/v1/public/menu/categories"))
        .data as MenuItemCategory[];
};

export const deleteCategory = async (id: string): Promise<AxiosResponse> => {
    return await axiosInstance.delete(`/api/v1/menu/categories/${id}`);
};

export const updateCategory = async (
    id: string,
    value: string
): Promise<AxiosResponse> => {
    return await axiosInstance.post(`/api/v1/menu/categories/${id}`, { value });
};

export const addCategory = async (value: string): Promise<AxiosResponse> => {
    return await axiosInstance.post(`/api/v1/menu/categories`, { value });
};
