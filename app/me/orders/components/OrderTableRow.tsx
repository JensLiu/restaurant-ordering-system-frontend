import { checkOutById, deleteOrderById } from "@/app/actions/orders";
import { Order } from "@/types/OrderTypes";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { toast } from "react-hot-toast";

interface OrderTableRowProprs {
    id: string;
    data: Order;
    onRefresh: () => void;
}

const OrderTableRow: FC<OrderTableRowProprs> = ({ id, data, onRefresh }) => {
    const displayLength = data.items.length > 3 ? 3 + 1 : data.items.length;
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

    const router = useRouter();

    const handleContinueCheckout = () => {
        checkOutById(data.id).then((data) => {
            router.push(data.redirectUrl);
        });
    };

    const handleDeleteOrder = () => {
        deleteOrderById(data.id).then((data) => {
            toast.success("Order deleted");
            onRefresh();
        });
    };

    return (
        <tr>
            <td>
                <div className="text-sm text-semibold">{id}</div>
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    {data.items.length > 0 && imageGroup}
                    <div>
                        <div className="text-sm text-semibold">{title}</div>
                    </div>
                </div>
            </td>
            <td>
                <span
                    className={clsx(
                        "badge",
                        data.status == "UNPAID" && "badge-error",
                        data.status == "PREPARING" && "badge-warning",
                        data.status == "READY" && "badge-success"
                    )}
                >
                    {data.status}
                </span>
            </td>
            <td>
                <div>{new Date(data.createdAt).toLocaleString()}</div>
            </td>
            <th>
                <div className="space-x-2">
                    {data.status == "UNPAID" && (
                        <span>
                            <button
                                onClick={handleContinueCheckout}
                                className="btn btn-ghost btn-xs"
                            >
                                continue
                            </button>
                            <button
                                onClick={handleDeleteOrder}
                                className="btn btn-ghost btn-xs"
                            >
                                delete
                            </button>
                        </span>
                    )}
                </div>
            </th>
        </tr>
    );
};

export default OrderTableRow;
