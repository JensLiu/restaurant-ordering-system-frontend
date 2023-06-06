"use cleint";

import { FC, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {
    Field,
    FieldErrors,
    FieldValues,
    UseFormRegister,
} from "react-hook-form";

interface PreviewInputProps {
    id: string;
    label: string;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    register?: UseFormRegister<FieldValues>;
    errors?: FieldErrors;
}

const PreviewInput: FC<PreviewInputProps> = ({
    id,
    label,
    value,
    disabled,
    required,
    register,
    errors,
}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    return (
        <div className="flex flex-cols-3 items-center w-full h-full gap-3">
            <label className="text-bold">{label}:</label>
            {isEditMode ? (
                <input
                    type="text"
                    placeholder={value}
                    className="input input-borded w-full"
                    {...register?.(id, { required })}
                />
            ) : (
                <span className="text-semibold w-full ">{value}</span>
            )}
            <button
                onClick={() => {
                    setIsEditMode(!isEditMode);
                }}
                className="btn ml-2"
                disabled={disabled}
            >
                <AiOutlineEdit size={20} />
            </button>
        </div>
    );
};

export default PreviewInput;
