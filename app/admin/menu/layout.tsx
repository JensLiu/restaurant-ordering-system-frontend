import ClientOnly from "@/app/components/ClientOnly";
import MenuEditModal from "./components/MenuEditModal";

export default function MenuManagementLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="min-h-full">{children}</div>
        </div>
    );
}
