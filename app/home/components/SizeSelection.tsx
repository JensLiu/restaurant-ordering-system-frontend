import { MenuItemSize } from "@/types/MenuTypes";
import React, { FC } from "react";
import Select from "react-select";

interface SizeSelectionProps {
    options: MenuItemSize[];
    value: MenuItemSize | undefined;
    onChange: (size: MenuItemSize) => void;
}

const SizeSelection: FC<SizeSelectionProps> = ({
    options,
    value,
    onChange,
}) => {
    const selectOptions = options.map((item) => ({
        ...item,
        label: `${item.size}   $${item.price}`,
        value: item.size,
    }));
    return (
        <Select
            className="basic-single w-full"
            classNamePrefix="select"
            isClearable
            isSearchable
            value={value}
            name="Select size"
            options={selectOptions}
            onChange={(value) => {
                onChange(value as MenuItemSize);
            }}
        />
    );
};

export default SizeSelection;
