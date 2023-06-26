import React, { use } from "react";
import { getMenuItems } from "../actions/menu";
import ClientOnly from "../components/ClientOnly";
import HomeClient from "./HomeClient";
import MenuItemPreviewModal from "./components/MenuItemPreviewModal";

const getData = async () => {
    return await getMenuItems();
}

const HomePage = () => {

    const menuItems = use(getMenuItems());

    return (
        <ClientOnly>
            <MenuItemPreviewModal />
            <HomeClient menuItems={menuItems} />
        </ClientOnly>
    );
};

export default HomePage;
