import { MenuItem, MenuItemFlavour, MenuItemSize } from "@/types/MenuTypes";
import {
    OrderItemRequest,
    OrderRequestDto,
    SelectedItem,
} from "@/types/OrderTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { paymentCancelUrl, paymentSuccessUrl } from "../actions/default";

interface CartState {
    items: SelectedItem[];
    totalPrice: () => number;
    addToCart: (
        item: MenuItem,
        selectedSize: MenuItemSize,
        selectedFlavour: MenuItemFlavour,
        quantity: number
    ) => void;
    updateQuntityByIndex: (index: number, quantity: number) => void;
    removeFromCartByIndex: (index: number) => void;
    // commitOrder: () => void;
    getAsRequestDto: () => OrderRequestDto;
    clearCart: () => void;
}

const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            totalPrice: () => {
                // total price = sum(subtotals)
                // subtotal = price * quantity
                return get()
                    .items.map(
                        (item) => item.selectedSize.price * item.quantity
                    )
                    .reduce((a, b) => a + b, 0);
            },
            addToCart: (item, selectedSize, selectedFlavour, qty) => {
                set((state) => {
                    // check if item with the same flavour and size is selected
                    const prevIndex = state.items.findIndex(
                        (val) =>
                            val.id === item.id &&
                            val.selectedFlavour.id === selectedFlavour.id &&
                            val.selectedSize.id === selectedSize.id
                    );
                    if (prevIndex != -1) {
                        // if so accumulate the quantity instead of adding one
                        const updatedItems = [...state.items];
                        updatedItems[prevIndex].quantity += qty;
                        return {
                            ...state,
                            items: updatedItems,
                        };
                    }
                    // else append new one to the list
                    return {
                        ...state,
                        items: [
                            ...state.items,
                            {
                                ...item,
                                selectedFlavour,
                                selectedSize,
                                quantity: qty,
                            },
                        ],
                    };
                });
            },
            updateQuntityByIndex: (index, quantity) => {
                set((state) => {
                    const item = state.items[index];
                    if (item) {
                        item.quantity = quantity;
                        return {
                            ...state,
                            items: [...state.items, item],
                        };
                    }
                    return state;
                });
            },
            removeFromCartByIndex: (index) =>
                set((state) => {
                    const items = state.items.filter((_, i) => i !== index);
                    return {
                        ...state,
                        items,
                    };
                }),
            getAsRequestDto: () => {
                const orderItemDto: OrderItemRequest[] = get().items.map(
                    (item) => ({
                        itemId: item.id,
                        flavourId: item.selectedFlavour.id,
                        sizeId: item.selectedSize.id,
                        quantity: item.quantity,
                    })
                );
                return {
                    orderItems: orderItemDto,
                    successUrl: paymentSuccessUrl,
                    cancelUrl: paymentCancelUrl,
                };
            },
            clearCart: () => {
                set(() => ({ items: [] }));
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;
