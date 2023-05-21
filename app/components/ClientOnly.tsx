"use client";

import { useEffect, useState } from "react";

interface clientOnlyProps {
    children: React.ReactNode;
}

// function to render only client side code

const ClientOnly: React.FC<clientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children}</>;
};

export default ClientOnly;
