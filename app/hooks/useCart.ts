import { MenuItem, MenuItemFlavour, SizeAndPrice } from "@/types/MenuTypes";
import { OrderItemRequestDto, OrderRequestDto, SelectedItem } from "@/types/CartTypes";
import { create } from "zustand";

interface CartState {
    items: SelectedItem[];
    totalPrice: () => number;
    addToCart: (
        item: MenuItem,
        selectedSize: SizeAndPrice,
        selectedFlavour: MenuItemFlavour,
        quantity: number
    ) => void;
    updateQuntityByIndex: (index: number, quantity: number) => void;
    removeFromCartByIndex: (index: number) => void;
    // commitOrder: () => void;
    getAsRequestDto: () => OrderRequestDto;
}

const useCart = create<CartState>()((set, get) => ({
    items: [],
    totalPrice: () => {
        return 0;
    },
    addToCart: (item, selectedSize, selectedFlavour, qty) => {
        set((state) => {
            const prevIndex = state.items.findIndex(
                (val) =>
                    val.id === item.id &&
                    val.selectedFlavour.id === selectedFlavour.id &&
                    val.selectedSize.id === selectedSize.id
            );
            console.log(state.items[prevIndex]);
            if (prevIndex != -1) {
                const updatedItems = [...state.items];
                updatedItems[prevIndex].quantity += qty;
                return {
                    ...state,
                    items: updatedItems,
                };
            }
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
        const orderItemDto: OrderItemRequestDto[] = get().items.map((item) => ({
            itemId: item.id,
            flavourId: item.selectedFlavour.id,
            sizeId: item.selectedSize.id,
            quantity: item.quantity,
        }));
        return {
            orderItems: orderItemDto,
            successUrl: "http://localhost:3000/success",
            cancelUrl: "http://localhost:3000/cancel",
        }
    },
}));

export default useCart;
