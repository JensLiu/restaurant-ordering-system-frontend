"use client";
import React from "react";

import PeakHourChart from "./components/PeakHourChart";
import TrendingCategoryChart from "./components/TrendingCategoryChart";
import TrendingMenuItemChart from "./components/TrendingMenuItemChart";
import ValuableCustomersChart from "./components/ValuableCustomersChart";

const page = () => {
    return (
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-3 mx-auto items-center justify-center min-w-full min-h-full">
            <div className="card shadow-xl w-full h-full">
                <div className="card-body mb-3">
                    <h2 className="card-title">Peak Hours</h2>
                    <PeakHourChart />
                </div>
            </div>
            <div className="card shadow-xl w-full h-full">
                <div className="card-body mb-3">
                    <h2 className="card-title">Trending Items</h2>
                    <TrendingMenuItemChart />
                </div>
            </div>
            <div className="card shadow-xl">
                <div className="card-body mb-3 w-full h-full">
                    <h2 className="card-title">Trending Categories</h2>
                    <TrendingCategoryChart />
                </div>
            </div>
            <div className="card shadow-xl w-full h-full">
                <div className="card-body mb-3">
                    <h2 className="card-title">Valuable Customers</h2>
                    <ValuableCustomersChart />
                </div>
            </div>
        </div>
    );
};

export default page;
