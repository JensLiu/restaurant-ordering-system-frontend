"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { User } from "@/types/UserTypes";
import useUserStore from "@/app/hooks/useUserStore";
import { getCurrentUser, updateUserData } from "@/app/actions/users";
import PreviewInput from "@/app/components/input/PreviewInput";
import ImageUpload from "@/app/components/ImageUpload";

const UserProfilePage = () => {
    const userStore = useUserStore();
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            password: "",
            firstname: "",
            lastname: "",
            imageSrc: "",
            role: "",
        },
    });

    const imageSrc = watch("imageSrc");
    const firstname = watch("firstname");
    const lastname = watch("lastname");
    const email = watch("email");
    const role = watch("role");

    const fetchData = () => {
        setIsLoading(true);
        getCurrentUser()
            .then((user) => {
                useUserStore.getState().refreshData();
                reset({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    imageSrc: user.imageSrc,
                    role: user.role,
                });
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    };

    useEffect(fetchData, []);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        updateUserData(data)
            .then((user) => {
                reset({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    imageSrc: user.imageSrc,
                    role: user.role,
                });
                useUserStore.getState().refreshData();
                toast.success("Profile updated");
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

    let bodyContent = (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3 mx-5">
            <div className="md:row-span-2">
                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="font-semibold">Avatar</div>
                    <ImageUpload
                        onChange={(url: string) => {
                            setValue("imageSrc", url);
                        }}
                        value={imageSrc}
                    />
                </div>
            </div>
            <PreviewInput
                label="Firstname"
                id="firstname"
                value={firstname}
                register={register}
                errors={errors}
            />
            <PreviewInput
                label="Lastname"
                id="lastname"
                value={lastname}
                register={register}
                errors={errors}
            />
            <PreviewInput label="Email" id="email" value={email} disabled />
            <PreviewInput label="Role" id="email" value={role} disabled />
        </div>
    );

    return (
        <div className="container mx-auto py-5 min-w-screen min-h-screen">
            <div className="card w-96 bg-base-100 shadow-xl min-w-full">
                <div className="card-body base-300">
                    <div className="card-title justify-between mb-2">
                        <div>{userStore.firstname}, here is your profile</div>
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
