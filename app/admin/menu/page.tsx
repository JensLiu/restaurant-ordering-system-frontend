import React, { use } from "react";
import MenuEditModal from "./components/MenuEditModal";
import MenuManagementClient from "./MenuManagementClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getMenuItems } from "@/app/actions/menu";

const getData = async () => {
    const menuItems = await getMenuItems();
    return menuItems;
};

const MenuManagement = () => {
    const menuItems = use(getData());
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
