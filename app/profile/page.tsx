"use client";

import useUserStore from "../hooks/useUserStore";
import { AuthRequiredError } from "@/app/lib/exceptions";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import PreviewInput from "../components/input/PreviewInput";
import { toast } from "react-hot-toast";
import axiosInstance from "../actions/axios";
import { getCurrentUser } from "../actions/getUsers";
import { User } from "@/types/UserTypes";

const UserProfilePage = () => {
    const userStore = useUserStore();
    const [data, setData] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = () => {
        setIsLoading(true);
        getCurrentUser()
            .then((user) => setData(user))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    };

    useEffect(fetchData, []);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // axios
        //     .post("http://localhost:8080/api/v1/users/me", data, {
        //         withCredentials: true,
        //         headers: {
        //             "Access-Control-Allow-Origin": "http://localhost:8080",
        //             "Content-type": "application/json",
        //         },
        //     })
        axiosInstance
            .post("/api/v1/users/me", data)
            .then((res) => {
                reset(res.data);
                toast.success("Profile updated");
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error updating profile");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onRefresh = () => {
        fetchData();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            password: "",
            firstname: data?.firstname,
            lastname: data?.lastname,
        },
    });

    if (!userStore.isAuthenticated) {
        throw new AuthRequiredError();
    }

    let bodyContent = (
        <div className="grid grid-cols-2 gap-3 mx-5">
            <PreviewInput
                label="Firstname"
                id="firstname"
                value={data?.firstname}
                register={register}
                errors={errors}
            />
            <PreviewInput
                label="Lastname"
                id="lastname"
                value={data?.lastname}
                register={register}
                errors={errors}
            />
            <PreviewInput
                label="Email"
                id="email"
                value={data?.email}
                disabled
            />
            <PreviewInput label="Role" id="email" value={data?.role} disabled />
        </div>
    );

    return (
        <div className="container mx-auto py-5 min-w-screen min-h-screen">
            <div className="card w-96 bg-base-100 shadow-xl min-w-full">
                <div className="card-body base-300">
                    <div className="card-title justify-between mb-2">
                        <div>{userStore.firstname}, here's your profile</div>
                        <div className="card-actions justify-end">
                            <button
                                onClick={onRefresh}
                                className="btn btn-Secondary"
                            >
                                Refresh
                            </button>
                            <button
                                onClick={handleSubmit(onSubmit)}
                                className="btn btn-primary"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="card p-5 bg-base-200 rounded-box">
                        {bodyContent}
                    </div>
                    <div className="card-actions justify-end">
                        <button
                            onClick={handleSubmit(onSubmit)}
                            className="btn btn-primary"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
