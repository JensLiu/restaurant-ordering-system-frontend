"use client";
import { MenuItem } from "@/types/MenuItem";
import React, { FC } from "react";

interface MenuItemClientProps {
    item: MenuItem;
}

const checkoutUrl = "http://localhost:8080/stripe/create-checkout-session"

const MenuItemClient: FC<MenuItemClientProps> = ({ item }) => {
    // https://stackoverflow.com/questions/68266238/stripe-checkout-session-not-working-nodejs
    return (
        <div>
            <section>
                <div className="product">
                    <img
                        src="https://i.imgur.com/EHyR2nP.png"
                        alt="The cover of Stubborn Attachments"
                    />
                    <div className="description">
                        <h3>Stubborn Attachments</h3>
                        <h5>$20.00</h5>
                    </div>
                </div>
                <form action={checkoutUrl} method="POST">
                    <button type="submit">Checkout</button>
                </form>
            </section>{" "}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={item.imageSrc}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">{item.name}</h1>
                        <p className="py-6">{item.description}</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItemClient;
