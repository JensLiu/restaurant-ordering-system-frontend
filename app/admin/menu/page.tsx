import React, { use } from "react";
import MenuEditModal from "./components/MenuEditModal";
import MenuManagementClient from "./MenuManagementClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getMenuItemsServerSide } from "@/app/actions/menu";

const MenuManagement = async () => {
    const menuItems = await getMenuItemsServerSide();
    return (
        <div className="container mx-auto py-6">
            <ClientOnly>
                <MenuEditModal />
                <MenuManagementClient menuItems={menuItems} />
            </ClientOnly>
        </div>
    );
};

export default MenuManagement;
