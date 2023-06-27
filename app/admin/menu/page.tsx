import React, { use } from "react";
import MenuEditModal from "./components/MenuEditModal";
import MenuManagementClient from "./MenuManagementClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getMenuItemsServerSide } from "@/app/actions/menu";

const MenuManagement = async () => {
    const menuItems = await getMenuItemsServerSide();
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
