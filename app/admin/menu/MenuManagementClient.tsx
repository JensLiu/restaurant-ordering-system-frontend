"use client";
import useMenuItemEditModal from "@/app/hooks/useMenuEditModal";
import { MenuItem } from "@/types/MenuTypes";
import { useRouter } from "next/navigation";
import MenuItemTableRow from "./components/MenuItemTableRow";
import { getAllMenuItems } from "@/app/actions/menu";
import { useEffect, useState } from "react";

const MenuManagementClient = () => {
    const menuModal = useMenuItemEditModal();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const header = ["Name", "Description", "Categories", "Actions"];

    const fetchData = async () => {
        const data = await getAllMenuItems();
        setMenuItems(data);
    };

    const refreshData = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
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
                                onDelete={refreshData}
                                onEdit={refreshData}
                                onSoldOut={refreshData}
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
    );
};

export default MenuManagementClient;
