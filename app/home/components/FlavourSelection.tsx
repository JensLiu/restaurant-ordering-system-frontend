import { MenuItemFlavour } from "@/types/MenuTypes";
import React, { FC } from "react";
import Select from "react-select";

interface FlavourSectionProps {
    options: MenuItemFlavour[];
    value?: MenuItemFlavour;
    onChange: (value: MenuItemFlavour) => void;
}

const FlavourSelection: FC<FlavourSectionProps> = ({
    options,
    value,
    onChange,
}) => {
    const selectOptions = options.map((item) => ({
        ...item,
        label: item.name,
        value: item.name,
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
                onChange(value as MenuItemFlavour);
            }}
        />
    );
};

export default FlavourSelection;
