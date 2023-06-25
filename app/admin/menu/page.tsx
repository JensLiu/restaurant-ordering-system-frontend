import React from "react";
import MenuEditModal from "./components/MenuEditModal";
import MenuManagementClient from "./MenuManagementClient";
import ClientOnly from "@/app/components/ClientOnly";

const MenuManagement = async () => {
    return (
        <div>
            <ClientOnly>
                <MenuEditModal />
                <MenuManagementClient />
            </ClientOnly>
        </div>
    );
};

export default MenuManagement;
