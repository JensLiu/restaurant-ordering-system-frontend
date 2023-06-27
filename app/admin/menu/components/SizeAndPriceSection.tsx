import React, { FC, useEffect, useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { MenuItemFormValues, emptySizeAndPrice } from "../hooks/MenuItemForm";
import { BsTrash } from "react-icons/bs";
import { get } from "http";

interface SizeAndPriceSectionProps {
    form: UseFormReturn<MenuItemFormValues, any>;
}

const SizeAndPriceSection: FC<SizeAndPriceSectionProps> = ({ form }) => {
    const { control, getValues, register } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "sizes",
    });

    return (
        <div>
            <div className="flex flex-col-2 justify-between items-center">
                <span className="font-semibold">Sizes</span>
                <button
                    className="btn btn-xs"
                    onClick={() => {
                        append({ id: "", size: "", price: 0 });
                    }}
                >
                    ADD
                </button>
            </div>
            {fields.map((field, index) => {
                const disabled = getValues(`sizes.${index}.id`) != (undefined || null || "");
                return (
                    <div
                        key={field.id}
                        className="flex flex-row gap-3 my-3 justify-between"
                    >
                        <label className="input-group">
                            <span>Size</span>
                            <input
                                type="text"
                                placeholder=""
                                className="input input-bordered w-full"
                                {...register(`sizes.${index}.size`, {
                                    required: true,
                                })}
                                color={"primary"}
                                disabled={disabled}
                            />
                        </label>
                        <label className="input-group">
                            <span>Price</span>
                            <input
                                type="text"
                                placeholder=""
                                className="input input-bordered w-full"
                                {...register(`sizes.${index}.price`, {
                                    required: true,
                                })}
                                color={"primary"}
                                disabled={disabled}
                            />
                        </label>

                        <button
                            onClick={() => remove(index)}
                            className="btn btn-error btn-circle"
                        >
                            <BsTrash size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default SizeAndPriceSection;
