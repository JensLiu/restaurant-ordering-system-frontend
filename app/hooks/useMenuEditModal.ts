import { MenuItem } from "@/types/MenuItem";
import { create } from "zustand";
import { menuItemFormDefaultValues } from "../admin/menu/hooks/MenuItemForm";

interface MenuItemEditModalState {
    isOpen: boolean;
    onOpen: (initialData?: MenuItem) => void;
    onClose: () => void;
    modalId: string;
    initialData?: MenuItem;
}

const useMenuItemEditModal = create<MenuItemEditModalState>()((set) => ({
    isOpen: false,
    modalId: "menu-item-edit-modal",
    initialData: menuItemFormDefaultValues as MenuItem,
    onOpen: (initialData?: MenuItem) => set({ isOpen: true, initialData }),
    onClose: () => set({ isOpen: false, initialData: undefined }),
}));

export default useMenuItemEditModal;