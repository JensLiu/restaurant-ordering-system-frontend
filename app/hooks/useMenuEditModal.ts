import {MenuItem} from "@/types/MenuTypes";
import {create} from "zustand";
import {menuItemFormDefaultValues} from "../admin/menu/hooks/MenuItemForm";

interface MenuItemEditModalState {
    isOpen: boolean;
    onOpen: (initialData?: MenuItem, closeCallback?: () => void) => void;
    onClose: () => void;
    modalId: string;
    initialData?: MenuItem;
    closeCallback?: () => void;
}

const useMenuItemEditModal = create<MenuItemEditModalState>()((set) => ({
    isOpen: false,
    modalId: "menu-item-edit-modal",
    initialData: menuItemFormDefaultValues as MenuItem,
    onOpen: (initialData?: MenuItem, closeCallback?: () => void) => set({isOpen: true, initialData, closeCallback}),
    onClose: () => {
        set({isOpen: false, initialData: undefined})
        let callback = useMenuItemEditModal.getState().closeCallback
        callback && callback()
    },
}));

export default useMenuItemEditModal;