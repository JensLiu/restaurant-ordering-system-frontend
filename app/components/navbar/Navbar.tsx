"use client";

import { usePathname, useRouter } from "next/navigation";
import UserMenu from "./UserMenu";
import CartMenu from "./CartMenu";
import useUserStore from "@/app/hooks/useUserStore";
import { getHomeUrlByRole } from "@/app/actions/default";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const user = useUserStore();

    if (pathname == "/login") {
        return null;
    }

    const greeting = () => {
        const currentHour = new Date().getHours();
        let greetingPrefix = "Hello";
        if (currentHour < 12) {
            greetingPrefix = "Morning";
        } else if (currentHour < 18) {
            greetingPrefix = "Good day";
        } else {
            greetingPrefix = "Evening";
        }

        if (user.id) {
            // user logged in
            if (user.role == "CUSTOMER") {
                return `${greetingPrefix}, ${user.firstname}!`;
            } else if (user.role == "CHEF") {
                return `${greetingPrefix}, Chef ${user.lastname}!`;
            } else if (user.role == "ADMIN") {
                return `${greetingPrefix}, Manager ${user.lastname}!`;
            }
        }
        return "Restaurant";
    };

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm backdrop-filter backdrop-blur-lg bg-opacity-30">
            <div className="flex-1">
                <a
                    onClick={() => router.replace(getHomeUrlByRole(user.role))}
                    className="btn btn-ghost normal-case text-xl"
                >
                    {greeting()}
                </a>
            </div>
            <div className="flex-none">
                {user.role == "CUSTOMER" && <CartMenu />}
                <UserMenu />
            </div>
        </div>
    );
};

export default Navbar;
