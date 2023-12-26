"use client";

import {useCallback, useState} from "react";
import useAuthForm from "@/app/hooks/useAuthForm";
import {Avatar, Button, Input, Modal} from "react-daisyui";
import {FieldValues, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "@/app/hooks/useUserStore";
import {useRouter} from "next/navigation";
import {getHomeUrlByRole} from "@/app/actions/default";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const loginModal = useAuthForm();
    const router = useRouter();
    const userStore = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [variant, setVariant] = useState<Variant>("LOGIN");

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
        },
    });

    const onSubmit = async (data: FieldValues) => {
        setIsLoading(true);
        if (variant == "LOGIN") {
            userStore?.signIn(data.email, data.password, (success) => {
                if (success) {
                    handleClose();
                    toast.success("logged in");
                    let role = useUserStore.getState().role
                    router.replace(getHomeUrlByRole(role))
                }
                setIsLoading(false);
            });
        } else if (variant == "REGISTER") {
            userStore?.signUp(
                data.email,
                data.password,
                data.firstname,
                data.lastname,
                (success) => {
                    if (success) {
                        toast.success("signed up");
                        setVariant("LOGIN");
                    }
                    setIsLoading(false);
                }
            );
        }
    };

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);

    const handleClose = useCallback(() => {
        loginModal.onClose();
        reset();
    }, [loginModal, reset]);

    let formBody = (
        <div className="flex flex-col pt-5 my-4 gap-4 justify-center">
            <div className="flex justify-center mb-3">
                <Avatar
                    shape="circle"
                    size="md"
                    src="/images/avatar_placeholder.jpg"
                />
            </div>
            {variant == "REGISTER" && (
                <>
                    <Input
                        id="firstname"
                        disabled={isLoading}
                        bordered
                        placeholder="First Name"
                        {...register("firstname", {required: true})}
                        color={errors["firstname"] ? "error" : "primary"}
                    />
                    <Input
                        id="lastname"
                        disabled={isLoading}
                        bordered
                        placeholder="Last Name"
                        {...register("lastname", {required: true})}
                        color={errors["lastname"] ? "error" : "primary"}
                    />
                </>
            )}

            <Input
                id="email"
                type="email"
                placeholder="Email"
                disabled={isLoading}
                bordered
                {...register("email", {required: true})}
                color={errors["email"] ? "error" : "primary"}
            />
            <Input
                id="password"
                type="password"
                placeholder="Password"
                disabled={isLoading}
                bordered
                {...register("password", {required: true})}
                color={errors["password"] ? "error" : "primary"}
            />
        </div>
    );

    if (isLoading) {
        formBody = (
            <div className="flex flex-col min-h-full min-w-full gap-3 items-center justify-center">
                <div className="text-xl font-semibold">Loggin in</div>
                <div className="test-md">We will be with you in a moment</div>
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <Modal open={loginModal.isOpen}>
            <Button
                size="sm"
                shape="circle"
                className="absolute right-2 top-2"
                onClick={handleClose}
            >
                ✕
            </Button>
            <Modal.Header>
                {variant == "LOGIN" ? "Welcome back!" : "Hello there!"}
            </Modal.Header>
            <Modal.Body>{formBody}</Modal.Body>
            <Modal.Actions>
                <div className="flex flex-col-2 w-full justify-between items-center">
                    {!isLoading && (
                        <>
                            <div>
                                <span>
                                    {variant == "LOGIN"
                                        ? "Don't have an account?"
                                        : "Already have an account?"}
                                </span>
                                <span
                                    onClick={toggleVariant}
                                    className="ml-2 underline cursor-pointer"
                                >
                                    {variant == "LOGIN" ? "Sign up" : "Log in"}
                                </span>
                            </div>
                            <Button onClick={handleSubmit(onSubmit)}>
                                {variant == "LOGIN" ? "Log in" : "Sign up"}
                            </Button>
                        </>
                    )}
                </div>
            </Modal.Actions>
        </Modal>
    );
};

export default AuthForm;
