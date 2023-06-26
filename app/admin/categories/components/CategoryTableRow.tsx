import PreviewInput from "@/app/components/input/PreviewInput";
import React, { FC } from "react";

interface CategoryTableRowProps {
    id: string;
    defaultValue: string;
    onUpdate: (id: string, value: string) => void;
    onDelete: (id: string) => void;
}

const CategoryTableRow: FC<CategoryTableRowProps> = ({
    id,
    defaultValue,
    onUpdate,
    onDelete,
}) => {
    const [categoryName, setCategoryName] = React.useState(defaultValue);

    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div>
                        <div className="font-bold">{id}</div>
                    </div>
                </div>
            </td>
            <td>
                <input
                    type="text"
                    onChange={(e) => {
                        setCategoryName(e.target.value);
                    }}
                    value={categoryName}
                    className="input input-bordered w-full max-w-xs"
                />
            </td>
            <th>
                <div className="space-x-2">
                    <span>
                        <button onClick={() => onUpdate(id, categoryName)} className="btn btn-ghost btn-xs">
                            update
                        </button>
                    </span>
                    <span>
                        <button
                            onClick={() => setCategoryName(defaultValue)}
                            className="btn btn-ghost btn-xs"
                        >
                            reset
                        </button>
                    </span>
                    <span>
                        <button onClick={() => onDelete(id)} className="btn btn-ghost btn-xs">delete</button>
                    </span>
                </div>
            </th>
        </tr>
    );
};

export default CategoryTableRow;
