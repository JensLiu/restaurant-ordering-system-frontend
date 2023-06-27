"use client";
import React, { useEffect, useState } from "react";
import { Order } from "@/types/OrderTypes";
import toast from "react-hot-toast";
import WaitingOrderCard from "./components/WaitingOrderCard";
import ProcessingOrderDetail from "./components/ProcessingOrderDetail";
import { useWebSocketStore } from "../hooks/useWebSocketStore";
import { getChefOrders } from "../actions/orders";

const ChefHomeClient = () => {
    const [orderList, setOrderList] = useState<Order[]>([]);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const wsStore = useWebSocketStore();

    useEffect(() => {
        console.log("ChefHomeClient mounted")
        fetchOrders();
        wsStore.addOrderCallback(onOrderNotification);
        return () => {
            console.log("ChefHomeClient unmounted")
            wsStore.removeOrderCallback(onOrderNotification);
        };
    }, [wsStore.addOrderCallback, wsStore.removeMessageCallback]);

    const onOrderNotification = (message: any) => {
        fetchOrders();
    };

    const fetchOrders = () => {
        getChefOrders().then((data) => {
            setOrderList(data);
        });
    };

    const handleOrderClick = (order: Order) => {
        setCurrentOrder(order);
    };

    const handleAcceptOrder = (id: string) => {
        // send notification to the server
        wsStore.send({
            type: "ORDER",
            orderId: id,
            orderStatus: "PREPARING",
        });

        // update the accepted order
        setOrderList((prevList) =>
            prevList.map((order) => {
                // should sync with the server and revalidate
                if (order.id == id) {
                    order.status = "PREPARING";
                    return order;
                }
                return order;
            })
        );
    };

    const handleCompleteOrder = (id: string) => {
        // send notification to server
        wsStore.send({
            type: "ORDER",
            orderId: id,
            orderStatus: "READY",
        });

        // update order list
        setOrderList((prevList) => {
            // should sync with the server and revalidate
            const newList = prevList.filter((order) => order.id !== id);
            const nextOrder = newList.at(0);
            setCurrentOrder(nextOrder ? nextOrder : null);
            return newList;
        });
    };

    return (
        <div className="bg-white h-full w-full rounded-lg p-4">
            <div className="flex flex-row h-full gap-4">
                {/* waiting order sidebar */}
                <div className="basis-1/5">
                    <h3 className="text-lg font-bold mb-2">Waiting Orders</h3>
                    <div className="flex flex-col-1 max-h-[calc(100vh-10rem)] overflow-auto">
                        {orderList.length > 0 ? (
                            <div className="grid w-full my-3 mx-3 gap-3">
                                {orderList.map((order) => (
                                    <WaitingOrderCard
                                        key={order.id}
                                        data={order}
                                        onClick={handleOrderClick}
                                        selected={order.id === currentOrder?.id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No orders to cook.</p>
                        )}
                    </div>
                </div>

                {/* preparing order detail */}
                <div className="basis-4/5">
                    <h3 className="text-lg font-bold mb-2">Processing Order</h3>
                    {currentOrder ? (
                        <div>
                            <div className="flex items-center">
                                <ProcessingOrderDetail
                                    data={currentOrder}
                                    onAccept={handleAcceptOrder}
                                    onComplete={handleCompleteOrder}
                                />
                            </div>
                        </div>
                    ) : (
                        <p>No order selected</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChefHomeClient;
