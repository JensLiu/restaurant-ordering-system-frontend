"use client";

import {
    addCategory,
    deleteCategory,
    updateCategory,
} from "@/app/actions/menu";
import { FC, useState } from "react";
import CategoryTableRow from "./components/CategoryTableRow";
import { MenuItemCategory } from "@/types/MenuTypes";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CategoryManagementProps {
    categories: MenuItemCategory[];
}

const CategoryManagement: FC<CategoryManagementProps> = ({ categories }) => {
    const header = ["Id", "Category name", "Actions"];
    const router = useRouter();
    const [newCategoryName, setNewCategoryName] = useState("");

    const refreshData = () => {
        router.refresh();
    };

    const handleDelete = (id: string) => {
        deleteCategory(id).then((res) => {
            if (res.status === 200) {
                toast.success("Category deleted");
                refreshData();
            } else {
                toast.error("Category not deleted");
            }
        });
    };

    const handleUpdate = (id: string, value: string) => {
        updateCategory(id, value).then((res) => {
            if (res.status === 200) {
                toast.success("Category updated");
                refreshData();
            } else {
                toast.error("Something went wrong");
            }
        });
    };

    const handleAdd = () => {
        addCategory(newCategoryName).then((res) => {
            if (res.status === 200) {
                toast.success("Category added");
                setNewCategoryName("");
                refreshData();
            } else {
                toast.error("Something went wrong");
            }
        });
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-4">Manage catrgories</h1>
            <h1 className="text-md font-medium mb-4">Categories of food</h1>
            <div className="flex flex-col">
                <div className="my-5 flex flex-row items-center gap-5 min-w-full">
                    <div>
                        <input
                            className="input input-bordered w-full"
                            type="text"
                            onChange={(e) => {
                                setNewCategoryName(e.target.value);
                            }}
                            value={newCategoryName}
                        />
                    </div>

                    <button className="btn" onClick={handleAdd}>
                        Add Item
                    </button>
                </div>
                <table className="table min-w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            {header.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <CategoryTableRow
                                key={category.id}
                                id={category.id}
                                defaultValue={category.value}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                            />
                        ))}
                    </tbody>
                    {/* foot */}
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

export default CategoryManagement;
