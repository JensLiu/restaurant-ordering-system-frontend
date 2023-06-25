"use client";
import useUserStore from "@/app/hooks/useUserStore";
import React, { useEffect } from "react";
import OrderTableRow from "./components/OrderTableRow";
import { Order } from "@/types/OrderTypes";
import { useWebSocketStore } from "@/app/hooks/useWebSocketStore";
import { getOrdersForCurrentUser } from "@/app/actions/orders";

const OrderClient = () => {
    const user = useUserStore();
    const header = ["Id", "Overview", "Status", "Created At", "Actions"];
    const [orders, setOrders] = React.useState<Order[]>([]);
    const wsStore = useWebSocketStore();

    const fetchOrders = () => {
        getOrdersForCurrentUser()
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const orderNotificationCallback = (message: any) => {
        fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
        wsStore.addOrderCallback(orderNotificationCallback);
        return () => wsStore.removeOrderCallback(orderNotificationCallback);
    }, [wsStore.addMessageCallback, wsStore.removeMessageCallback]);

    return (
        <div>
            {/* {JSON.stringify(orders)} */}
            <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-4">Your orders</h1>
                <h1 className="text-md font-medium mb-4">
                    Here are all your orders
                </h1>

                <div className="flex flex-col gap-3 ">
                    <table className="table min-w-full">
                        <thead>
                            <tr>
                                {header.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => (
                                <OrderTableRow
                                    key={item.id}
                                    id={item.id}
                                    data={item}
                                />
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                {header.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderClient;
