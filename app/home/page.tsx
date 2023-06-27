import React, { use } from "react";
import { getMenuItems, getMenuItemsServerSide } from "../actions/menu";
import ClientOnly from "../components/ClientOnly";
import HomeClient from "./HomeClient";
import MenuItemPreviewModal from "./components/MenuItemPreviewModal";

// const getData = async () => {
//     return await getMenuItems();
// }

const HomePage = async () => {

    // const menuItems = use(getMenuItems());
    const menuItems = await getMenuItemsServerSide();

    return (
        <ClientOnly>
            <MenuItemPreviewModal />
            <HomeClient menuItems={menuItems} />
        </ClientOnly>
    );
};

export default HomePage;
