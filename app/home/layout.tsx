import ClientOnly from "../components/ClientOnly";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <ClientOnly>{children}</ClientOnly>
        </div>
    );
}