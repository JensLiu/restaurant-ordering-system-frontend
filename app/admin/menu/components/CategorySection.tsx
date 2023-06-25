import { UseFormReturn } from "react-hook-form";
import { MenuItemFormValues } from "../hooks/MenuItemForm";
import { FC, useEffect, useState } from "react";
import Select from "react-select";
import { getCategories } from "@/app/actions/menu";

interface CategorySectionPropsProps {
    form: UseFormReturn<MenuItemFormValues, any>;
}

type MenuItemCategoryOption = {
    id: string;
    value: string;
    label: string;
};

const CategorySection: FC<CategorySectionPropsProps> = ({ form }) => {
    const { setValue } = form;
    const initialOptions = [
        {
            label: "Loading...",
            value: "Loading...",
            id: "Loading...",
        },
    ];

    const [options, setOptions] =
        useState<MenuItemCategoryOption[]>(initialOptions);

    const selectedValues = form
        .watch("categories")
        .map((val: { id: string; value: string }) => ({
            value: val.value,
            label: val.value,
            id: val.id,
        }));

    const fetchOptions = () => {
        getCategories().then((data) => {
            // res.data as { id: string; value: string }[];
            const opts = data.map((val: { id: string; value: string }) => ({
                label: val.value,
                value: val.value,
                id: val.id,
            }));
            setOptions(opts);
        });
    };
    useEffect(fetchOptions, []);

    return (
        <div className="flex flex-col gap-3">
            <span className="font-semibold">Categories</span>
            <Select
                isMulti
                name="category"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                value={selectedValues}
                onChange={(value) => {
                    const vals: { id: string; value: string }[] = value.map(
                        (val) => ({
                            id: val.id,
                            value: val.value,
                        })
                    );
                    setValue("categories", vals);
                }}
            />
        </div>
    );
};
export default CategorySection;
