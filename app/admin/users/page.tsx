"use client";
import { getUsers } from "@/app/actions/users";
import { User } from "@/types/UserTypes";
import React, { useEffect, useState } from "react";
import UserDetailTableRow from "./components/UserDetailTableRow";

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        getUsers()
            .then((user) => setUsers(user))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    };

    useEffect(fetchData, []);

    const header = ["Name", "Email", "Actions"];

    let tableContent = (
        <div className="flex min-w-full min-h-full items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    );

    if (!isLoading) {
        tableContent = (
            <table className="table min-w-full table-lg">
                {/* head */}
                <thead>
                    <tr>
                        {header.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserDetailTableRow
                            key={user.id} // Add a key prop with a unique identifier
                            id={user.id}
                            firstname={user.firstname}
                            lastname={user.lastname}
                            imageSrc={user.imageSrc}
                            email={user.email}
                            role={user.role}
                        />
                    ))}
                </tbody>
                {/* foot */}
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
        <div className="container mx-auto border-solid border-4 border-sky-500">
            <h1 className="text-3xl font-bold mb-4">Manage users</h1>
            <h1 className="text-md font-medium mb-4">Customers and chefs</h1>
            {tableContent}
        </div>
    );
};

export default UserManagement;
