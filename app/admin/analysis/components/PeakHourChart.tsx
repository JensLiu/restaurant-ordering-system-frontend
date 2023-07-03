import React, { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { getPeakHours } from "@/app/actions/analysis";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
    },
};

const PeakHourChart = () => {
    const [data, setData] = useState<ChartData<'line'>>();

    const fetchData = async () => {
        const analysisData = (await getPeakHours()) as {
            hour: number;
            count: number;
        }[];
        const labels = analysisData.map((item) => item.hour.toString());
        const values = analysisData.map((item) => item.count);
        setData({
            labels: labels,
            datasets: [{ data: values, label: "Peak Hours" }],
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container flex min-w-full min-h-full items-center justify-center">
            {data ? (
                <Line options={options} data={data} />
            ) : (
                <span className="loading loading-spinner loading-lg"></span>
            )}
        </div>
    );
};

export default PeakHourChart;
