"use client";
import toast from "react-hot-toast";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useAuthForm from "@/app/hooks/useAuthForm";
import useUserStore from "@/app/hooks/useUserStore";
import { useRouter } from "next/navigation";

const UserMenu = () => {
    const authForm = useAuthForm();
    const router = useRouter();     // router from the old package, trying to solve this
    const { email, imageSrc, signOut } = useUserStore((state) => ({
        email: state.email,
        imageSrc: state.imageSrc,
        signOut: state.signOut,
    }));

    const handleSignout = () => {
        signOut(() => {
            toast.success("Signned out");
            router.replace('/');
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
                        <MenuItem label="Profile" onClick={() => {router.push('/profile')}} />
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
