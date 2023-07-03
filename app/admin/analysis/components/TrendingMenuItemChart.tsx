import React, { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getTrendingMenuItems } from "@/app/actions/analysis";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors
);

const options = {
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        colors: {
            forceOverride: true,
        },
    },
};

const TrendingMenuItemChart = () => {
    const [data, setData] = useState<ChartData<"bar">>();

    const fetchData = async () => {
        const analysisData = (await getTrendingMenuItems()) as {
            id: string;
            name: string;
            count: number;
        }[];
        console.log(analysisData);
        const labels = analysisData.map((item) => item.name);
        const values = analysisData.map((item) => item.count);
        setData({
            labels: labels,
            datasets: [{ data: values }],
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container flex min-w-full min-h-full items-center justify-center">
            {data ? (
                <Bar data={data} options={options} />
            ) : (
                <span className="loading loading-spinner loading-lg"></span>
            )}
        </div>
    );
};

export default TrendingMenuItemChart;
