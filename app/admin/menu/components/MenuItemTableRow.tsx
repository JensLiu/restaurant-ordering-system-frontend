import { deleteMenuItem, enableMenuItem, selloutMenuItem } from "@/app/actions/menu";
import useMenuItemEditModal from "@/app/hooks/useMenuEditModal";
import { MenuItem } from "@/types/MenuTypes";
import React, { FC } from "react";

interface MenuItemTableRowProps {
    id: string;
    data: MenuItem;
    onEdit: () => void;
    onDelete: () => void;
    onSoldOut: () => void;
}

const MenuItemTableRow: FC<MenuItemTableRowProps> = ({
    id,
    data,
    onEdit,
    onDelete,
    onSoldOut,
}) => {
    const menuModal = useMenuItemEditModal();
    const handleEdit = () => {
        menuModal.onOpen(data, onEdit);
    };
    const handleDelete = () => {
        deleteMenuItem(id).then((res) => onDelete());
    };
    const handleSoldOut = () => {
        if (data.isSoldOut) {
            enableMenuItem(id).then((res) => onSoldOut());
        } else {
            selloutMenuItem(id).then((res) => onSoldOut());
        }
    };
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            {data.imageSrc && (
                                <img
                                    src={data.imageSrc}
                                    alt="Avatar Tailwind CSS Component"
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{data.name}</div>
                        <div className="text-sm opacity-50">
                            {data.isSoldOut ? "sold out" : "available"}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                {data.description}
            </td>
            <td>{data.categories?.map((val) => val.value).join(" ")}</td>
            <th>
                <div className="space-x-2">
                    <span>
                        <button
                            onClick={handleEdit}
                            className="btn btn-ghost btn-xs"
                        >
                            edit
                        </button>
                    </span>
                    <span>
                        <button
                            onClick={handleSoldOut}
                            className="btn btn-ghost btn-xs"
                        >
                            {data.isSoldOut ? "enable" : "disable"}
                        </button>
                    </span>
                    <span>
                        <button
                            onClick={handleDelete}
                            className="btn btn-ghost btn-xs"
                        >
                            delete
                        </button>
                    </span>
                </div>
            </th>
        </tr>
    );
};

export default MenuItemTableRow;
