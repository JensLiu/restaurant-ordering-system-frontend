import React, { useEffect, useState } from "react";
import { MenuItem } from "@/types/MenuTypes";
import MenuItemTableRow from "./components/MenuItemTableRow";
import { getMenuItems } from "@/app/actions/getMenuItems";
import useMenuItemEditModal from "@/app/hooks/useMenuEditModal";
import MenuEditModal from "./components/MenuEditModal";
import MenuManagementClient from "./MenuManagementClient";
import ClientOnly from "@/app/components/ClientOnly";
import { useRouter } from "next/navigation";

const MenuManagement = async () => {
    const menuItems = await getMenuItems();
    const router = useRouter();
    return (
        <div>
            <ClientOnly>
                <MenuEditModal onSuccess={router.refresh} />
                <MenuManagementClient menuItems={menuItems} />
            </ClientOnly>
        </div>
    );
};

export default MenuManagement;
