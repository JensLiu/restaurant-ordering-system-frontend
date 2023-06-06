import React, { FC } from "react";

interface MenuItemCardProps {
    id: string;
    name: string;
    price: number;
    imageSrc: string;
    onClick: () => void;
}

const MenuItemCard: FC<MenuItemCardProps> = ({
    id,
    name,
    price,
    imageSrc,
    onClick,
}) => {
    return (
        <div className="max-w-sm mx-auto min-w-full min-h-full">
            <div className="card-normal shadow-lg rounded-md">
                <img
                    src={imageSrc}
                    alt={name}
                    className="w-full h-40 object-cover rounded-t-md"
                />
                <div className="card-body">
                    <h3 className="card-title">{name}</h3>
                    <p className="card-text">from ${price}</p>
                    <button className="btn btn-primary" onClick={onClick}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;
