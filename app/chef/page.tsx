import React from "react";
import ClientOnly from "../components/ClientOnly";
import ChefHomeClient from "./ChefHomeClient";

const ChefHome = () => {
    return (
        <ClientOnly>
            <ChefHomeClient />
        </ClientOnly>
    );
};

export default ChefHome;
