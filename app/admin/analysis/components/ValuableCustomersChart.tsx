import { getValuableCustomers } from "@/app/actions/analysis";

import React, { useEffect, useState } from "react";

const ValuableCustomersChart = () => {
    const [data, setData] = useState<
        {
            id: string;
            firstname: string;
            lastname: string;
            registeredAt: string;
            imageSrc: string;
            totalSpend: number;
        }[]
    >();

    const fetchData = async () => {
        const analysisData = await getValuableCustomers();
        setData(analysisData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    let body = <span className="loading loading-lg"></span>;

    if (data) {
        body = (
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Total spend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((item, index) => (
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <span>{index + 1}</span>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    {item.imageSrc && (
                                                        <img
                                                            src={item.imageSrc}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {`${item.firstname} ${item.lastname}`}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">
                                            Since{" "}
                                            {new Date(
                                                item.registeredAt
                                            ).toDateString()}
                                        </span>
                                    </td>
                                    <td>
                                        ${" "}
                                        {item.totalSpend == null
                                            ? 0
                                            : item.totalSpend}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return body;
};

export default ValuableCustomersChart;
