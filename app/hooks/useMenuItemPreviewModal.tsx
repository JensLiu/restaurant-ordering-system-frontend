import { MenuItem } from "@/types/MenuTypes";
import { create } from "zustand";

interface useMenuItemPreviewModalState {
    isOpen: boolean;
    onOpen: (initialData?: MenuItem) => void;
    onClose: () => void;
    modalId: string;
    data?: MenuItem;
}

const useMenuItemPreviewModal = create<useMenuItemPreviewModalState>()(
    (set) => ({
        isOpen: false,
        modalId: "menu-item-preview-modal",
        onOpen: (data?: MenuItem) => set({ isOpen: true, data }),
        onClose: () => set({ isOpen: false, data: undefined }),
    })
);

export default useMenuItemPreviewModal;
