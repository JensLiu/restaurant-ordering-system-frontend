import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container flex">
            <div className="">
                <AdminSidebar />
            </div>
            <div className="flex flex-grow">{children}</div>
        </div>
    );
}
