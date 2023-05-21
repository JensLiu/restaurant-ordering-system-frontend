"use client";

import { usePathname, useRouter } from "next/navigation";
import UserMenu from "./UserMenu";
import CartMenu from "./CartMenu";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname == "/login") {
        return null;
    }

    return (
        
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm backdrop-filter backdrop-blur-lg bg-opacity-30">
            <div className="flex-1">
                <a onClick={() => router.push('/')} className="btn btn-ghost normal-case text-xl">Restaurant</a>
            </div>
            <div className="flex-none">
                <CartMenu />
                <UserMenu />
            </div>
        </div>
    );
};

export default Navbar;
