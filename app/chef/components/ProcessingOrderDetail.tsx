import { Order } from "@/types/OrderTypes";
import React, { FC } from "react";
import OrderDetailTableRow from "./OrderDetailTableRow";

interface ProcessingOrderDetailProps {
    data: Order;
    onAccept: (id: string) => void;
    onComplete: (id: string) => void;
}

const ProcessingOrderDetail: FC<ProcessingOrderDetailProps> = ({
    data,
    onAccept,
    onComplete,
}) => {
    const header = ["Item", "Size", "Flavour", "Quantity"];
    
    const handleClick = () => {
        if (data.status == "WAITING") {
            onAccept(data.id);
        } else if (data.status == "PREPARING") {
            onComplete(data.id);
        }
    }
    
    return (
        <div className="h-full min-w-full">
            <div>
                <div className="container mx-auto py-6">
                    <h1 className="text-3xl font-bold mb-4">
                        Order for{" "}
                        {data.user.firstname + " " + data.user.lastname}
                    </h1>
                    <h2 className="text-md my-3">
                        Since: {new Date(data.paidAt).toLocaleString()}
                    </h2>

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
                                {data.items.map((item) => (
                                    <OrderDetailTableRow key={item.id} data={item} />
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
            <button onClick={handleClick} className="btn w-full">
                {data.status == "WAITING" && "Accept"}
                {data.status == "PREPARING" && "Complete"}
            </button>
        </div>
    );
};

export default ProcessingOrderDetail;
