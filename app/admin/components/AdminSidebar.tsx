"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AdminSidebar = () => {
    const router = useRouter();
    const isOpen = true;
    return (
        <div className="h-full flex overflow-hidden">
            <div
                className={`bg-gray-800 text-white w-64 ${
                    isOpen ? "block" : "hidden"
                }`}
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-xl font-semibold">Pannel</span>
                </div>
                <nav className="mt-auto">
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-700"
                        onClick={() => router.push("/admin/menu")}
                    >
                        Menu
                    </a>
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-700"
                        onClick={() => router.push("/admin/users")}
                    >
                        Users
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default AdminSidebar;
