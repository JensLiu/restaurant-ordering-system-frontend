import { MenuItem } from "@/types/MenuItem";
import { useForm } from "react-hook-form";

export type MenuItemFormValues = {
    id: string | undefined;
    name: string;
    description: string;
    imageSrc: string;
    flavours: { name: string }[];
    sizes: { size: string; price: number }[];
    categories: { id: string; value: string }[];
    isSoldOut: boolean;
};

export const menuItemFormDefaultValues: MenuItemFormValues = {
    id: undefined,
    name: "",
    description: "",
    imageSrc: "",
    flavours: [{ name: "" }],
    sizes: [{ size: "", price: 0 }],
    categories: [],
    isSoldOut: false,
};

export const useMenuItemForm = (initialData?: MenuItem) => {
    return useForm<MenuItemFormValues>({
        defaultValues: menuItemFormDefaultValues,
    });
};

export const emptySizeAndPrice = { size: "", price: 0 };