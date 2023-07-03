"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const AdminSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const selections = [
        { name: "Analysis", path: "/admin/analysis" },
        { name: "Menu", path: "/admin/menu" },
        { name: "Categories", path: "/admin/categories" },
        { name: "Users", path: "/admin/users" },
    ];

    return (
        <div className="flex flex-col gap-3 mx-auto h-full overflow-hidden">
            <ul className="menu bg-base-100 w-56">
                {selections.map((selection, index) => (
                    <li key={index}>
                        <a
                            onClick={() => router.push(selection.path)}
                            className={`${
                                pathname.endsWith(selection.path)
                                    ? "active"
                                    : ""
                            }`}
                        >
                            {selection.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminSidebar;
