import ClientOnly from "@/app/components/ClientOnly";

export default function UserProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    
    return (
        <div className="bg-base-200">
            <ClientOnly>{children}</ClientOnly>
        </div>
    );
}
