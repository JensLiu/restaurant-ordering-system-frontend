import ClientOnly from "@/app/components/ClientOnly";
import React from "react";
import OrderClient from "./OrderClient";
const CustomerOrder = () => {

    return (
        <ClientOnly>
            <OrderClient />
        </ClientOnly>
    );
};

export default CustomerOrder;
