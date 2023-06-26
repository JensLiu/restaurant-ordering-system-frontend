import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col-2 min-h-full gap-4">
            <div className="flex">
                <AdminSidebar />
            </div>
            <div className="flex flex-grow">{children}</div>
        </div>
    );
}
