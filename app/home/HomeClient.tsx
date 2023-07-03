"use client";

import { FC } from "react";
import useMenuItemPreviewModal from "../hooks/useMenuItemPreviewModal";
import { MenuItem } from "@/types/MenuTypes";
import MenuItemCard from "../components/MenuItemCard";

interface HomeClientProps {
    menuItems: MenuItem[];
}

const HomeClient: FC<HomeClientProps> = ({ menuItems }) => {
    const previewModal = useMenuItemPreviewModal();

    const onClick = (id: string) => {
        previewModal.onOpen(menuItems.find((item) => item.id === id));
    };

    return (
        <div className="container mx-3 md:mx-auto py-5">
            <h1 className="text-3xl font-bold mb-3">Our finest cuisines</h1>
            <h1 className="text-md font-medium mb-6">Our menu at a glance</h1>
            {/* {cart.items.map((item) => (<div>{JSON.stringify(item)}</div>))} */}
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

export default HomeClient;
