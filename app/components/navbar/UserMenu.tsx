"use client";
import toast from "react-hot-toast";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useAuthForm from "@/app/hooks/useAuthForm";
import useUserStore from "@/app/hooks/useUserStore";
import { useRouter } from "next/navigation";

const UserMenu = () => {
    const authForm = useAuthForm();
    const router = useRouter();
    const { role, email, imageSrc, signOut } = useUserStore((state) => ({
        email: state.email,
        role: state.role,
        imageSrc: state.imageSrc,
        signOut: state.signOut,
    }));

    const handleSignout = () => {
        signOut(() => {
            toast.success("Signned out");
            router.replace("/home");
        });
    };

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <Avatar src={imageSrc} />
            </label>

            <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
                {email ? (
                    <>
                        {role == "ADMIN" && (
                            <>
                                <MenuItem
                                    label="Dashboard"
                                    onClick={() => {
                                        router.push("/admin/analysis");
                                    }}
                                />
                            </>
                        )}
                        {role == "CUSTOMER" && (
                            <MenuItem
                                label="Orders"
                                onClick={() => {
                                    router.push("/me/orders");
                                }}
                            />
                        )}
                        {role == "CHEF" && (
                            <MenuItem
                                label="Workspace"
                                onClick={() => {
                                    router.push("/chef");
                                }}
                            />
                        )}
                        <MenuItem
                            label="Profile"
                            onClick={() => {
                                router.push("/me/profile");
                            }}
                        />
                        <MenuItem label="Sign out" onClick={handleSignout} />
                    </>
                ) : (
                    <MenuItem label="Login" onClick={authForm.onOpen} />
                )}
            </ul>
        </div>
    );
};

export default UserMenu;
