import { MenuItem } from "@/types/MenuTypes";
import { useForm } from "react-hook-form";

export type MenuItemFormValues = {
    id: string | undefined;
    name: string;
    description: string;
    imageSrc: string;
    flavours: { id: string, name: string }[];
    sizes: { id: string, size: string; price: number }[];
    categories: { id: string; value: string }[];
    isSoldOut: boolean;
};

export const menuItemFormDefaultValues: MenuItemFormValues = {
    id: undefined,
    name: "",
    description: "",
    imageSrc: "",
    flavours: [{ id: "",  name: "" }],
    sizes: [{ id: "", size: "", price: 0 }],
    categories: [],
    isSoldOut: false,
};

export const useMenuItemForm = (initialData?: MenuItem) => {
    return useForm<MenuItemFormValues>({
        defaultValues: menuItemFormDefaultValues,
    });
};

export const emptySizeAndPrice = { id: "", size: "", price: 0 };
