import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row h-full gap-4">
            <div className="basis-1/6">
                <AdminSidebar />
            </div>
            <div className="basis-5/6">{children}</div>
        </div>
    );
}
