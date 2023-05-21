import { SelectedItem } from "@/types/SelectedItem";
import { create } from "zustand";

interface CartState {
    items: SelectedItem[];
    totalPrice: () => number;
    addToCart: (item: SelectedItem) => void;
    removeFromCart: (id: number) => void;
}

const useCart = create<CartState>()((set) => ({
    items: [],
    totalPrice: () => {
        return 0;
    },
    addToCart: (item) => {
        // (set((state) => {
            
        // }));
    },
    removeFromCart: (id) => {
        // (set((state) => {

        // }));
    }
}));

export default useCart;