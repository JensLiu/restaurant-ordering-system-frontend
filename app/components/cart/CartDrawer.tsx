"use client";
import React from "react";
import CartItem from "./CartItem";
import useCartDrawer from "@/app/hooks/useCartDrawer";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import useCartStore from "@/app/hooks/useCartStore";
import { orderCheckout } from "@/app/actions/orders";

const CartDrawer = () => {
    const cart = useCartStore();
    const cartDrawer = useCartDrawer();
    const router = useRouter();

    const handleCheckout = () => {
        const dto = cart.getAsRequestDto();
        orderCheckout(dto).then((data) => {
            cart.clearCart();
            router.replace(data.redirectUrl);
        });
    };

    return (
        <div
            className={`fixed z-50 inset-y-0 right-0 bg-white shadow-lg ${
                cartDrawer.isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="px-4 py-6">
                <div className="flex items-center justify-start mb-4">
                    <button
                        onClick={cartDrawer.onClose}
                        className="btn btn-ghost btn-circle"
                    >
                        <IoChevronBackOutline size={16} />
                    </button>
                    <div className="text-xl font-semibold">Your Cart</div>
                </div>

                {/* Cart items */}
                <ul className="space-y-4">
                    {cart.items.map((item, index) => (
                        <CartItem
                            key={index}
                            index={index}
                            item={item}
                            onDelete={(index) => {
                                console.log(index);
                                cart.removeFromCartByIndex(index);
                            }}
                        />
                    ))}
                </ul>

                {/* Cart total */}
                <div className="flex items-center justify-between mt-6">
                    <span className="font-semibold">Total:</span>
                    <span className="text-lg font-bold">
                        ${cart.totalPrice()}
                    </span>
                </div>

                {/* Cart actions */}

                <div className="flex justify-end my-3">
                    <button
                        onClick={handleCheckout}
                        className="btn btn-success"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
