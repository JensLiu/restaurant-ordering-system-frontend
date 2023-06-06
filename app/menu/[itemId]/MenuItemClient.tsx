import { MenuItem } from "@/types/MenuItem";
import React, { FC } from "react";

interface MenuItemClientProps {
    item: MenuItem    
}

const MenuItemClient: FC<MenuItemClientProps> = ({
    item
}) => {
    return <div>MenuItemClient</div>;
};

export default MenuItemClient;
