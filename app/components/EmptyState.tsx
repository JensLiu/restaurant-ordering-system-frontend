"use client";

import { FC } from "react";

interface EmptyStateProps {
    title: string;
    description: string;
    imageSrc?: string;
    actionLabel: string;
    action: () => void;
    secondaryActionLabel?: string;
    secondaryAction?: () => void;
}

const EmptyState: FC<EmptyStateProps> = ({
    title,
    description,
    imageSrc,
    actionLabel,
    action,
    secondaryActionLabel,
    secondaryAction,
}) => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="text-md py-6">{description}</p>
                    <div className="flex flex-col-2 gap-5 justify-center">
                        <button onClick={action} className="btn btn-primary">
                            {actionLabel}
                        </button>
                        {secondaryActionLabel && (
                            <button
                                onClick={secondaryAction}
                                className="btn btn-secondary"
                            >
                                {secondaryActionLabel}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
