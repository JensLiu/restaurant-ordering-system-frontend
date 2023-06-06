'use client';
import { UnauthorizedError } from "@/app/lib/exceptions";
import useUserStore from "../../hooks/useUserStore";

const AdminDashboardPage = () => {

    const userStore = useUserStore();
    if (userStore.role !== 'ADMIN') {
        throw new UnauthorizedError();
    }
    

    return (
        <div>
            <div>Opening Hour</div>
            <div>Menu</div>
        </div>
    )
};

export default AdminDashboardPage;
