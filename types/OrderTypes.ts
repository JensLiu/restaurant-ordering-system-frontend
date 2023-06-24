import { MenuItem, MenuItemFlavour, MenuItemSize as MenuItemSize } from "./MenuTypes";
import { User } from "./UserTypes";

export type SelectedItem = MenuItem & {
    selectedFlavour: MenuItemFlavour,
    selectedSize: MenuItemSize
    quantity: number,
}

export type OrderRequestDto = {
    orderItems: OrderItemRequest[];
    successUrl: string;
    cancelUrl: string;
};

export type OrderItemRequest = {
    itemId: string;
    flavourId: string;
    sizeId: string;
    quantity: number;
};

export type OrderItem = {
    id: string;
    size: MenuItemSize;
    flavour: MenuItemFlavour;
    menuItem: MenuItem;
    quantity: number;
    subtotal: number;
}

export type OrderStatus = "UNPAID" | "WAITING" | "PREPARING" | "READY"

export type Order = {
    id: string;
    pickupCode: string;
    user: User;
    createdAt: number;
    paidAt: number;
    servedAt: number;
    totalPrice: number;
    status: OrderStatus;
    items: OrderItem[];

}