"use client";
import React, { useEffect, useState } from "react";
import { getMenuItems } from "../actions/getMenuItems";
import MenuItemCard from "../components/MenuItemCard";
import { MenuItem } from "@/types/MenuItem";

const HomePage = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        getMenuItems().then((items) => {
            console.log(items);
            setMenuItems(items);
        });
    });

    return (
            <div className="container mx-auto py-5">
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {menuItems.map((item) => (
                        <MenuItemCard
                            key={item.id} // Add a key prop with a unique identifier
                            id={item.id}
                            name={item.name}
                            imageSrc={item.imageSrc}
                            price={item.price}
                            onClick={() => {}}
                        />
                    ))}
                </div>
            </div>
    );
};

export default HomePage;
