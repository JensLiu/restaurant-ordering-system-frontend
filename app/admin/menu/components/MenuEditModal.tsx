"use client";
import ImageUpload from "@/app/components/ImageUpload";
import React, { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import {
    MenuItemFormValues,
    menuItemFormDefaultValues,
    useMenuItemForm,
} from "../hooks/MenuItemForm";
import SizeAndPriceSection from "./SizeAndPriceSection";
import FlavourSection from "./FlavourSection";
import CategorySection from "./CategorySection";
import useMenuItemEditModal from "@/app/hooks/useMenuEditModal";
import axiosInstance from "@/app/actions/axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const MenuEditModal = () => {
    const menuModal = useMenuItemEditModal();
    const form = useMenuItemForm(menuModal.initialData);
    const [editMode, setEditMode] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = form;

    useEffect(() => {
        reset(menuModal.initialData);
        if (menuModal.initialData) {
            console.log(menuModal.initialData);
            setEditMode(true);
        } else {
            setEditMode(false);
        }
    }, [menuModal.initialData, reset]);

    const imageSrc = watch("imageSrc");

    const handleClose = () => {
        menuModal.onClose();
        reset(menuItemFormDefaultValues);
    };

    const onSubmit = (data: MenuItemFormValues) => {
        axiosInstance.post("/api/v1/menu", data).then((res) => {
            console.log(res);
            toast.success("Menu item added");
            router.refresh();
            handleClose();
        });
    };

    const onUpdate = (data: MenuItemFormValues) => {
        axiosInstance
            .post(`/api/v1/menu/${data.id}`, data)
            .then((res) => {
                console.log(res);
                toast.success("Menu item updated");
                router.refresh();
                handleClose();
            });
    };

    const formBody = (
        <div className="flex flex-col pt-5 my-4 gap-4 justify-center">
            <ImageUpload
                onChange={(value: string) => {
                    setValue("imageSrc", value);
                }}
                value={imageSrc}
            />
            <label className="input-group">
                <span>Name</span>
                <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full"
                    {...register("name", { required: true })}
                    color={errors["name"] ? "error" : "primary"}
                />
            </label>
            <textarea
                className="textarea textarea-bordered"
                placeholder="Description"
                {...register("description")}
            ></textarea>
            <div className="flex">
                <label className="label cursor-pointer gap-3">
                    <span className="label-text font-semibold">Sold out</span>
                    <input
                        type="checkbox"
                        {...register("isSoldOut")}
                        className="checkbox"
                    />
                </label>
            </div>

            <CategorySection form={form} />
            <SizeAndPriceSection form={form} />
            <FlavourSection form={form} />
        </div>
    );

    return (
        <Modal
            open={menuModal.isOpen}
            responsive
            className="no-scrollbar overflow-y-scroll min-w-fit"
        >
            <Modal.Header className="sticky top-0">
                <span>{editMode ? "Edit" : "Add"}</span>
                <Button
                    size="sm"
                    shape="circle"
                    className="absolute right-0 top-0"
                    onClick={handleClose}
                >
                    ✕
                </Button>
            </Modal.Header>
            <Modal.Body>{formBody}</Modal.Body>
            <Modal.Actions>
                <div className="flex flex-col-2 w-full justify-between items-center">
                    <div>
                        <span></span>
                        <span className="ml-2 underline cursor-pointer"></span>
                    </div>
                    {editMode ? (
                        <Button onClick={handleSubmit(onUpdate)}>Update</Button>
                    ) : (
                        <Button onClick={handleSubmit(onSubmit)}>Add</Button>
                    )}
                </div>
            </Modal.Actions>
        </Modal>
    );
};

export default MenuEditModal;
