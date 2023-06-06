"use client";
import React, { useEffect, useState } from "react";
import { MenuItem } from "@/types/MenuItem";
import MenuItemTableRow from "./components/MenuItemTableRow";
import { getMenuItems } from "@/app/actions/getMenuItems";
import useMenuItemEditModal from "@/app/hooks/useMenuEditModal";
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
