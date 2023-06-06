import { getMenuItem } from "@/app/actions/getMenuItems";
import { usePathname } from "next/navigation";
import React from "react";

interface IParams {
    itemId: string;
}

const MenuItemDetail = async ({ params }: { params: IParams }) => {

    const menuItem = await getMenuItem(params.itemId);

    return <div>{menuItem.name}</div>;
};

export default MenuItemDetail;
