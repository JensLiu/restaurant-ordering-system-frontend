import React, { use } from "react";
import { getMenuItems, getMenuItemsServerSide } from "../actions/menu";
import ClientOnly from "../components/ClientOnly";
import HomeClient from "./HomeClient";
import MenuItemPreviewModal from "./components/MenuItemPreviewModal";

const HomePage = async () => {

    const menuItems = await getMenuItemsServerSide();

    return (
        <ClientOnly>
            <MenuItemPreviewModal />
            <HomeClient menuItems={menuItems} />
        </ClientOnly>
    );
};

export default HomePage;
