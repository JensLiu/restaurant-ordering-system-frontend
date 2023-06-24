import { SelectedItem } from "@/types/OrderTypes";
import React, { FC } from "react";

interface CartItemProps {
    index: number;
    item: SelectedItem;
    onDelete: (index: number) => void;
}

const CartItem: FC<CartItemProps> = ({ index, item, onDelete }) => {
    const subtotal = item.quantity * item.selectedSize.price;

    return (
        <li className="flex items-center w-auto justify-between gap-3">
            <div className="flex items-center gap-3">
                <img
                    src={item.imageSrc}
                    alt="Product"
                    className="w-12 h-12 mask mask-squircle"
                />
                <div className="flex-col-1">
                    <div className="text-md font-semibold">{item.name}</div>
                    <div>
                        <div className="text-xs">
                            {item.selectedSize.size},{" "}
                            {item.selectedFlavour.name} x {item.quantity}
                        </div>
                        <div className="text-xs">Subtotal: ${subtotal}</div>
                    </div>
                </div>
            </div>

            <button onClick={() => onDelete(index)} className="btn btn-circle btn-ghost">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </li>
    );
};

export default CartItem;
