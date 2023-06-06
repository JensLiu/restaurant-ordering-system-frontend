"use client";

import { useCallback, useState } from "react";
import useAuthForm from "@/app/hooks/useAuthForm";
import { Avatar, Button, Input, Modal } from "react-daisyui";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "@/app/hooks/useUserStore";
import { useRouter } from "next/navigation";
import useStore from "@/app/hooks/useStore";

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
        formState: { errors },
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
                if (success as boolean) {
                    toast.success("logged in");
                    handleClose();
                    router.refresh();
                } else {
                    toast.error("Something went wrong");
                }
            });
        } else if (variant == "REGISTER") {
            userStore?.signUp(
                data.email,
                data.password,
                data.firstname,
                data.lastname,
                (success) => {
                    if (success as boolean) {
                        toast.success("signed up");
                        handleClose();
                        router.refresh();
                    } else {
                        toast.error("Something went wrong");
                    }
                }
            );
        }

        setIsLoading(false);
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
            <Modal.Body>
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
                                {...register("firstname", { required: true })}
                                color={
                                    errors["firstname"] ? "error" : "primary"
                                }
                            />
                            <Input
                                id="lastname"
                                disabled={isLoading}
                                bordered
                                placeholder="Last Name"
                                {...register("lastname", { required: true })}
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
                        {...register("email", { required: true })}
                        color={errors["email"] ? "error" : "primary"}
                    />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        disabled={isLoading}
                        bordered
                        {...register("password", { required: true })}
                        color={errors["password"] ? "error" : "primary"}
                    />
                </div>
            </Modal.Body>
            <Modal.Actions>
                <div className="flex flex-col-2 w-full justify-between items-center">
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
                </div>
            </Modal.Actions>
        </Modal>
    );
};

export default AuthForm;
