"use client";
import React, { useEffect, useState } from "react";
import OrderTableRow from "./components/OrderTableRow";
import { Order } from "@/types/OrderTypes";
import { useWebSocketStore } from "@/app/hooks/useWebSocketStore";
import { getOrdersForCurrentUser } from "@/app/actions/orders";
import { toast } from "react-hot-toast";

const OrderClient = () => {
    const header = ["Id", "Overview", "Status", "Created At", "Actions"];
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const wsStore = useWebSocketStore();

    const fetchOrders = () => {
        setIsLoading(true);
        getOrdersForCurrentUser()
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    };

    const orderNotificationCallback = (message: any) => {
        fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
        wsStore.addOrderCallback(orderNotificationCallback);
        return () => wsStore.removeOrderCallback(orderNotificationCallback);
    }, [wsStore.addMessageCallback, wsStore.removeMessageCallback]);

    let tableContent = (
        <div className="flex min-w-full min-h-full items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    );

    if (!isLoading) {
        tableContent = (
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
                            onRefresh={() => {
                                fetchOrders();
                            }}
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
        );
    }

    return (
        <div>
            {/* {JSON.stringify(orders)} */}
            <div className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-4">Your orders</h1>
                <h1 className="text-md font-medium mb-4">
                    Here are all your orders
                </h1>

                <div className="flex flex-col gap-3 ">
                    {tableContent}
                </div>
            </div>
        </div>
    );
};

export default OrderClient;
