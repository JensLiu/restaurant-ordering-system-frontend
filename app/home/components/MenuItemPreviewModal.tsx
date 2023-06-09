"use client";
import useCart from "@/app/hooks/useCart";
import useMenuItemPreviewModal from "@/app/hooks/useMenuItemPreviewModal";
import React, { useState } from "react";
import { Button, Modal } from "react-daisyui";
import Stepper from "./Stepper";
import SizeSelection from "./SizeSelection";
import FlavourSelection from "./FlavourSelection";
import { MenuItemFlavour, SizeAndPrice } from "@/types/MenuTypes";

const MenuItemPreviewModal = () => {
    const previewModal = useMenuItemPreviewModal();
    const [quantity, setQuantity] = useState(0);
    const [selectedSize, setSelectedSize] = useState<SizeAndPrice>();
    const [selectedFlavour, setSelectedFlavour] = useState<MenuItemFlavour>();
    const item = previewModal.data;
    const cart = useCart();

    const handleClose = () => {
        previewModal.onClose();
        setQuantity(0);
    };

    const increment = () => {
        setQuantity((prev) => prev + 1);
    };

    const decrement = () => {
        setQuantity((prev) => (prev - 1 < 0 ? 0 : prev - 1));
    };

    const handleAddToCart = () => {
        if (!item || !selectedSize || !selectedFlavour) return;
        cart.addToCart(item, selectedSize, selectedFlavour, quantity);
        handleClose();
    };

    if (!item) {
        return <div></div>;
    }

    const contentBody = (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col-2 items-center justify-center gap-3">
                <div className="w-32 mask mask-squircle">
                    <img src={item.imageSrc} alt={item.name} />
                </div>
                <div>
                    <h2 className="card-title">{item?.name}</h2>
                    <p>{item.description}</p>
                </div>
            </div>
            <div className="flex items-center justify-center text-lg font-semibold">
                Price ${selectedSize? selectedSize!.price * quantity : 0}
            </div>
            <div className="flex flex-cols-2 justify-between items-center gap-3">
                <span className="font-semibold">Quantity</span>
                <Stepper
                    quantity={quantity}
                    increment={increment}
                    decrement={decrement}
                />
            </div>
            <div className="flex flex-col gap-3">
                <span className="font-semibold">Size</span>
                <SizeSelection
                    options={item.sizes}
                    value={selectedSize}
                    onChange={(value) => setSelectedSize(value)}
                />
            </div>
            <div className="flex flex-col gap-3">
                <span className="font-semibold">Flavour</span>
                <FlavourSelection
                    options={item.flavours}
                    value={selectedFlavour}
                    onChange={(value) => setSelectedFlavour(value)}
                />
            </div>
        </div>
    );

    return (
        <Modal
            open={previewModal.isOpen}
            responsive
            className="no-scrollbar overflow-y-scroll min-w-fit"
        >
            <Modal.Header className="sticky top-0">
                <span>Add to cart</span>
                <Button
                    size="sm"
                    shape="circle"
                    className="absolute right-0 top-0"
                    onClick={handleClose}
                >
                    ✕
                </Button>
            </Modal.Header>
            <Modal.Body>{contentBody}</Modal.Body>
            <Modal.Actions>
                <div className="flex flex-col-2 w-full justify-between items-center">
                    <div>
                        <span></span>
                        <span className="ml-2 underline cursor-pointer"></span>
                    </div>
                    <Button onClick={handleAddToCart}>Add to cart</Button>
                </div>
            </Modal.Actions>
        </Modal>
    );
};

export default MenuItemPreviewModal;
