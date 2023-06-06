import ClientOnly from "../../components/ClientOnly";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-base-200 min-h-screen min-w-full">
            <ClientOnly>{children}</ClientOnly>
        </div>
    );
}