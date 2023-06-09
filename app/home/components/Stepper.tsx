import React, { FC } from "react";

interface StepperProps {
    quantity: number;
    increment: () => void;
    decrement: () => void;
}

const Stepper: FC<StepperProps> = ({ quantity, increment, decrement }) => {
    return (
        <div className="flex items-center">
            <button
                className="px-2 py-1 bg-blue-500 text-white rounded-l"
                onClick={decrement}
            >
                -
            </button>
            <input
                className="w-10 px-2 py-1 text-center"
                type="text"
                value={quantity}
                readOnly
            />
            <button
                className="px-2 py-1 bg-blue-500 text-white rounded-r"
                onClick={increment}
            >
                +
            </button>
        </div>
    );
};

export default Stepper;
