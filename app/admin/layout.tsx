import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex container min-w-full mim-h-full">
            <div className="">
                <AdminSidebar />
            </div>
            <div className="flex-grow">{children}</div>
        </div>
    );
}
