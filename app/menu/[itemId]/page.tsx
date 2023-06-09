import { getMenuItem } from "@/app/actions/getMenuItems";
import ClientOnly from "@/app/components/ClientOnly";
import React from "react";
import MenuItemClient from "./MenuItemClient";

interface IParams {
    itemId: string;
}

const MenuItemDetail = async ({ params }: { params: IParams }) => {
    const menuItem = await getMenuItem(params.itemId);

    return (
        <div>
            <ClientOnly>
                <MenuItemClient item={menuItem} />
            </ClientOnly>
        </div>
    );
};

export default MenuItemDetail;
