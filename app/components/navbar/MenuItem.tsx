import React, { FC } from "react";

interface MenuItemProps {
    label: string;
    onClick: () => void;
    badgeValue?: string;
}

const MenuItem: FC<MenuItemProps> = ({ label, onClick, badgeValue }) => {
    return (
        <li>
            <div onClick={onClick} className="justify-between">
                {label}
                {badgeValue && <span className="badge">{badgeValue}</span>}
            </div>
        </li>
    );
};

export default MenuItem;
