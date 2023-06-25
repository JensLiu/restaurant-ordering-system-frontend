import React from "react";
import { getMenuItems } from "../actions/menu";
import ClientOnly from "../components/ClientOnly";
import HomeClient from "./HomeClient";
import MenuItemPreviewModal from "./components/MenuItemPreviewModal";

const HomePage = async () => {

    const menuItems = await getMenuItems();

    return (
        <ClientOnly>
            <MenuItemPreviewModal />
            <HomeClient menuItems={menuItems} />
        </ClientOnly>
    );
};

export default HomePage;
