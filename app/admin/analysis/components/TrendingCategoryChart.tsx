import React, { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Colors,
    ChartData,
    CoreChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { getTrendingCategories } from "@/app/actions/analysis";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const options = {
    plugins: {
        legend: {
            position: "right",
        },
        colors: {
            forceOverride: true,
        },
    },
};

const TrendingCategoryChart = () => {
    const [data, setData] = useState<ChartData<'pie'>>();

    const fetchData = async () => {
        const analysisData = (await getTrendingCategories()) as {
            id: string;
            value: string;
            count: number;
        }[];
        console.log(analysisData);
        const labels = analysisData.map((item) => item.value);
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
        <div className="container flex items-center justify-center">
            {data ? (
                <Pie data={data} options={options} />
            ) : (
                <span className="loading loading-spinner loading-lg"></span>
            )}
        </div>
    );
};

export default TrendingCategoryChart;
