export default function UserProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-base-200">
            {children}
        </div>
    );
}
