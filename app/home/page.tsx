"use client";
import React, { useEffect, useState } from "react";
import { getMenuItems } from "../actions/getMenuItems";
import MenuItemCard from "../components/MenuItemCard";
import { MenuItem } from "@/types/MenuItem";
import { useRouter } from "next/navigation";

const HomePage = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        getMenuItems().then((items) => {
            console.log(items);
            setMenuItems(items);
        });
    }, []);

    const onClick = (id: string) => {
        console.log(id);
        router.push(`/menu/${id}`);
    };

    return (
        <div className="container mx-auto py-5">
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {menuItems.map((item) => (
                    <MenuItemCard
                        key={item.id} // Add a key prop with a unique identifier
                        id={item.id}
                        name={item.name}
                        imageSrc={item.imageSrc}
                        description={item.description}
                        price={item.sizes[0]?.price}
                        onClick={() => {
                            onClick(item.id);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
