"use client";

import { FC } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
    return (
        <EmptyState
            title="Seems like there's an error..."
            description={error.message}
            actionLabel="Try again"
            action={() => {reset()}}
        />
    );
};

export default Error;
