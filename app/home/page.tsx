import React from "react";
import { getMenuItemsServerSide } from "../actions/menu";
import ClientOnly from "../components/ClientOnly";
import MenuItemPreviewModal from "./components/MenuItemPreviewModal";
import HomeClient from "./HomeClient";

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
