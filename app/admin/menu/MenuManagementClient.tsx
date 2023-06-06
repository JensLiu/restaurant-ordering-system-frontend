"use client";
import useMenuItemEditModal from "@/app/hooks/useMenuEditModal";
import { MenuItem } from "@/types/MenuItem";
import { useRouter } from "next/navigation";
import { FC } from "react";
import MenuItemTableRow from "./components/MenuItemTableRow";

interface MenuManagementClientProps {
    menuItems: MenuItem[];
}

const MenuManagementClient: FC<MenuManagementClientProps> = ({ menuItems }) => {
    const menuModal = useMenuItemEditModal();
    const router = useRouter();
    const header = ["Name", "Description", "Categories", "Actions"];

    return (
        <div>
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
                                    onDelete={() => router.refresh()}
                                    onEdit={() => router.refresh()}
                                    onSoldOut={() => router.refresh()}
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

export default MenuManagementClient;
