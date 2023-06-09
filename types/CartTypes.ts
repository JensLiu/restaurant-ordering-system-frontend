import { MenuItem, MenuItemFlavour, SizeAndPrice } from "./MenuTypes";

export type SelectedItem = MenuItem & {
    selectedFlavour: MenuItemFlavour,
    selectedSize: SizeAndPrice
    quantity: number,
}

export type OrderRequestDto = {
    orderItems: OrderItemRequestDto[];
    successUrl: string;
    cancelUrl: string;
};

export type OrderItemRequestDto = {
    itemId: string;
    flavourId: string;
    sizeId: string;
    quantity: number;
};