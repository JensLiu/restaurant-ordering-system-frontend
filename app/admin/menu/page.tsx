import React, { use } from "react";
import MenuEditModal from "./components/MenuEditModal";
import MenuManagementClient from "./MenuManagementClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getMenuItems } from "@/app/actions/menu";

const getData = async () => {
    console.log("start fetching menu items")
    const menuItems = await getMenuItems();
    console.log("finish fetching menu items")
    return menuItems;
};

const MenuManagement = async () => {
    const menuItems = await getData();
    console.log(menuItems);
    return (
        <div className="flex w-full">
            <ClientOnly>
                <MenuEditModal />
                <div className="flex-grow min-w-full min-h-screen">
                    <MenuManagementClient menuItems={menuItems} />
                </div>
            </ClientOnly>
        </div>
    );
};

export default MenuManagement;
