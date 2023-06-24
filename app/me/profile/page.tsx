"use client";

import { AuthRequiredError } from "@/app/lib/exceptions";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { User } from "@/types/UserTypes";
import useUserStore from "@/app/hooks/useUserStore";
import { getCurrentUser, updateUserData } from "@/app/actions/getUsers";
import axiosInstance from "@/app/actions/axios";
import PreviewInput from "@/app/components/input/PreviewInput";

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
        updateUserData(data)
            .then((newData) => {
                reset(newData);
                toast.success("Profile updated");
                setData(newData);
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
