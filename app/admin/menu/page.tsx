"use client";
import React, { useEffect, useState } from "react";
import { MenuItem } from "@/types/MenuItem";
import MenuItemTableRow from "./components/MenuItemTableRow";
import { getMenuItems } from "@/app/actions/getMenuItems";
import useMenuItemEditModal from "@/app/hooks/useMenuEditModal";
import MenuEditModal from "./components/MenuEditModal";

const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const menuModal = useMenuItemEditModal();
    const fetchData = () => {
        getMenuItems().then((items) => {
            console.log("fetching data")
            console.log(items)
            setMenuItems(items);
        });
    };

    useEffect(fetchData, []);

    const header = ["Name", "Description", "Categories", "Actions"];

    return (
        <div>
            <MenuEditModal />
            <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-4">Manage your menu</h1>
                <h1 className="text-md font-medium mb-4">
                    Items that everyone likes
                </h1>

                <div className="flex flex-col gap-3 ">
                    <button className="btn" onClick={() => menuModal.onOpen()}>
                        Add Item
                    </button>
                    <table className="table min-w-full">
                        <thead>
                            <tr>
                                {header.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {menuItems.map((item) => (
                                <MenuItemTableRow
                                    key={item.id} // Add a key prop with a unique identifier
                                    id={item.id}
                                    data={item}
                                    onDelete={fetchData}
                                    onEdit={fetchData}
                                    onSoldOut={fetchData}
                                    // id={item.id}
                                    // name={item.name}
                                    // imageSrc={item.imageSrc}
                                    // description={item.description}
                                    // categories={item.categories}
                                    // isSoldOut={item.isSoldOut}
                                />
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                {header.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MenuManagement;
