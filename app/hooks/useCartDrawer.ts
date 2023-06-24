import { create } from "zustand";


interface CartDrawerState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    modalId: string;
}

const useCartDrawer = create<CartDrawerState>()((set) => ({
    isOpen: false,
    modalId: "cart-drawer",
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useCartDrawer;