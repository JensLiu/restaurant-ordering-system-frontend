import React from "react";
import { getMenuItems } from "@/app/actions/getMenuItems";
import MenuEditModal from "./components/MenuEditModal";
import MenuManagementClient from "./MenuManagementClient";
import ClientOnly from "@/app/components/ClientOnly";

const MenuManagement = async () => {
    const menuItems = await getMenuItems();
    return (
        <div>
            <ClientOnly>
                <MenuEditModal />
                <MenuManagementClient menuItems={menuItems} />
            </ClientOnly>
        </div>
    );
};

export default MenuManagement;
