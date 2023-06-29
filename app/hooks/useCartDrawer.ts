import { create } from "zustand";


interface CartDrawerState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    drawerId: string;
}

const useCartDrawer = create<CartDrawerState>()((set) => ({
    isOpen: false,
    drawerId: "cart-drawer",
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useCartDrawer;