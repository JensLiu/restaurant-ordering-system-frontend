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
    const [isChekingOut, setIsCheckingOut] = React.useState(false);

    const handleCheckout = () => {
        const dto = cart.getAsRequestDto();
        setIsCheckingOut(true);
        orderCheckout(dto)
            .then((data) => {
                cart.clearCart();
                router.replace(data.redirectUrl);
            })
            .finally(() => {
                setIsCheckingOut(false);
            });
    };

    const cartBody = (
        <div className="px- py-6">
            <div className="flex items-center justify-start mb-4">
                <button
                    onClick={cartDrawer.onClose}
                    className="btn btn-ghost btn-circle"
                >
                    <IoChevronBackOutline size={16} />
                </button>
                <div className="text-xl font-semibold">Your Cart</div>
            </div>

            {cart.items.length == 0 ? (
                <div className="flex items-center justify-center text-lg font-semibold">
                    You cart is empty
                </div>
            ) : (
                <>
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
                            disabled={isChekingOut}
                        >
                            {isChekingOut && (
                                <span className="loading loading-spinner loading-md"></span>
                            )}
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="drawer drawer-end z-[60]">
            <input
                id={cartDrawer.drawerId}
                type="checkbox"
                className="drawer-toggle"
                checked={cartDrawer.isOpen}
                onChange={() => {}}
            />
            <div className="drawer-side">
                <label
                    htmlFor={cartDrawer.drawerId}
                    className="drawer-overlay"
                    onClick={cartDrawer.onClose}
                ></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {cartBody}
                </ul>
            </div>
        </div>
    );
};

export default CartDrawer;
