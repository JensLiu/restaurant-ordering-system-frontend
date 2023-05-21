import React, { FC } from "react";

interface CardProps {
    imageSrc?: string;
    title: string;
    subtitle: string;
    children?: React.ReactNode;
    cardActions?: React.ReactNode;
}

const Card: FC<CardProps> = ({
    imageSrc,
    title,
    subtitle,
    children,
    cardActions,
}) => {
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            {imageSrc && (
                <figure>
                    <img
                        src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                        alt="Album"
                    />
                </figure>
            )}

            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{subtitle}</p>
                <div>{children}</div>
                <div className="card-actions justify-end">{cardActions}</div>
            </div>
        </div>
    );
};

export default Card;
