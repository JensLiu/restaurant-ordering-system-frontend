"use client";

import clsx from "clsx";
import { FC, useCallback, useEffect, useState } from "react";

interface ModalProps {
    disabled?: boolean;
    isOpen?: boolean;
    onClose: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    action: () => void;
    secondaryActionLabel?: string;
    secondaryAction?: () => void;
}

const Modal: FC<ModalProps> = ({
    disabled,
    isOpen,
    onClose,
    title,
    body,
    footer,
    actionLabel,
    action,
    secondaryActionLabel,
    secondaryAction,
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 200);
    }, [disabled, onClose]);

    const handleAction = useCallback(() => {
        if (disabled) {
            return;
        }
        action();
    }, [disabled, action]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={clsx(
                "modal translate duration-200",
                isOpen && "modal-open"
            )}
        >
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{body}</p>
                <div
                    onClick={onClose}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                    ✕
                </div>
                <div className="modal-action">
                    <button className="btn btn-primary rounded-full">{actionLabel}</button>
                    {secondaryActionLabel && (
                        <button className="btn btn-secondary rounded-full">
                            {secondaryActionLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
