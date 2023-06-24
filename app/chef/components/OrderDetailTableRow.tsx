import { OrderItem } from "@/types/OrderTypes";
import React, { FC } from "react";

interface OrderDetailTableRowProps {
    data: OrderItem;
}

const OrderDetailTableRow: FC<OrderDetailTableRowProps> = ({ data }) => {
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            {data.menuItem.imageSrc && (
                                <img
                                    src={data.menuItem.imageSrc}
                                    alt="Avatar Tailwind CSS Component"
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{data.menuItem.name}</div>
                    </div>
                </div>
            </td>
            <td>
                {data.size.size}
                {/* <br /> */}
                {/* <span className="badge badge-ghost badge-sm">
            Desktop Support Technician
        </span> */}
            </td>
            <td>
                {data.flavour.name}
            </td>
            <td>
                {data.quantity}
            </td>
            {/* <th>
                <div className="space-x-2">
                    <span>
                        <button className="btn btn-ghost btn-xs">edit</button>
                    </span>
                    <span>
                        <button className="btn btn-ghost btn-xs">
                            {data.isSoldOut ? "enable" : "disable"}
                        </button>
                    </span>
                    <span>
                        <button className="btn btn-ghost btn-xs">delete</button>
                    </span>
                </div>
            </th> */}
        </tr>
    );
};

export default OrderDetailTableRow;
