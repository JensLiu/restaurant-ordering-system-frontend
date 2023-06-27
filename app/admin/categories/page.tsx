import { getCategories, getCategoriesServerSide } from "@/app/actions/menu";
import React, { use } from "react";
import CategoryManagementClient from "./CategoryManagementClient";

const CategoryManagement = async () => {
    const categories = await getCategoriesServerSide();
    return (
        <>
            <CategoryManagementClient categories={categories} />
        </>
    );
};

export default CategoryManagement;
