import React, { use } from "react";
import MenuEditModal from "./components/MenuEditModal";
import MenuManagementClient from "./MenuManagementClient";
import ClientOnly from "@/app/components/ClientOnly";
import { getMenuItemsServerSide } from "@/app/actions/menu";

const MenuManagement = async () => {
    return (
        <ClientOnly>
            <MenuEditModal />
            <MenuManagementClient />
        </ClientOnly>
    );
};

export default MenuManagement;
