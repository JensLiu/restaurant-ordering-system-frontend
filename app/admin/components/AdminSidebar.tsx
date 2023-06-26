"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const AdminSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="flex flex-grow h-full overflow-hidden">
            <div className="w-64">
                <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-xl font-semibold">Pannel</span>
                </div>
                <nav className="mt-auto">
                    <a
                        className={`block py-2 px-4 text-sm hover:text-white hover:bg-gray-700 ${
                            pathname.endsWith("/admin/menu")
                                ? "bg-gray-700 text-white"
                                : ""
                        }}`}
                        onClick={() => router.push("/admin/menu")}
                    >
                        Menu
                    </a>
                    <a
                        className={`block py-2 px-4 text-sm hover:text-white hover:bg-gray-700 ${
                            pathname.endsWith("/admin/categories")
                                ? "bg-gray-700 text-white"
                                : ""
                        }}`}
                        onClick={() => router.push("/admin/categories")}
                    >
                        Categories
                    </a>
                    <a
                        className={`block py-2 px-4 text-sm hover:text-white hover:bg-gray-700 ${
                            pathname.endsWith("/admin/users")
                                ? "bg-gray-700 text-white"
                                : ""
                        }}`}
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
