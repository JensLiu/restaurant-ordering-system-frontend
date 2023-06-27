import { UseFormReturn, useFieldArray } from "react-hook-form";
import { MenuItemFormValues } from "../hooks/MenuItemForm";
import { FC } from "react";
import { BsTrash } from "react-icons/bs";

interface FlavourSectionProps {
    form: UseFormReturn<MenuItemFormValues, any>;
}

const FlavourSection: FC<FlavourSectionProps> = ({ form }) => {
    const { control, getValues, register } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "flavours",
    });

    return (
        <div>
            <div className="flex flex-col-2 justify-between items-center">
                <span className="font-semibold">Flavours</span>
                <button
                    className="btn btn-xs"
                    onClick={() => append({ id: "", name: "" })}
                >
                    ADD
                </button>
            </div>
            {fields.map((field, index) => {
                const id = getValues(`flavours.${index}.id`);
                const disabled = id != (undefined || null || "");
                return (
                    <div
                        key={field.id}
                        className="flex flex-row gap-3 my-3 justify-between items-center"
                    >
                        <label className="input-group">
                            <span>Flavour</span>
                            <input
                                type="text"
                                placeholder=""
                                className="input input-bordered w-full"
                                {...register(`flavours.${index}.name`, {
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
export default FlavourSection;
