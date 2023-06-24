import { Order } from "@/types/OrderTypes";
import clsx from "clsx";
import React, { FC } from "react";

interface WaitingOrderCardProps {
    data: Order;
    onClick: (order: Order) => void;
    selected: boolean;
}

const WaitingOrderCard: FC<WaitingOrderCardProps> = ({
    data,
    onClick,
    selected,
}) => {
    const displayLength = 3;
    const imageGroup = (
        <div className="avatar-group -space-x-6">
            {data.items.slice(0, displayLength).map((item) => (
                <div key={item.id} className="avatar">
                    <div className="w-12">
                        <img src={item.menuItem.imageSrc} />
                    </div>
                </div>
            ))}
        </div>
    );
    const title = data.items
        .slice(0, displayLength)
        .map((item) => item.menuItem.name)
        .join(", ")
        .concat(data.items.length > displayLength ? "..." : "");

    return (
        <div
            onClick={() => onClick(data)}
            className={clsx(
                "card h-fit w-full cursor-pointer bg-base-100 shadow rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-200",
                selected && "scale-105 bg-blue-200"
            )}
        >
            <div className="flex flex-col-1 items-center justify-center my-5 mx-5 gap-3">
                {data.id}
                {imageGroup}
                <div>
                    <div className="font-semibold text-lg">{title}</div>
                    <div className={`badge ${selected && "badge-success"}`}>
                        {data.status}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingOrderCard;
