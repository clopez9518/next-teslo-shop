'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    maxQuantity: number;
    onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, maxQuantity, onQuantityChange }: Props) => {


    const onValueChange = (value: number) => {
        if (value + quantity < 1 || value + quantity > maxQuantity) return;
        onQuantityChange(value + quantity);
    }


    return (
        <div className="flex mb-3">

            <button className="cursor-pointer" onClick={() => onValueChange(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 text-center bg-gray-200 rounded">{quantity}</span>
            <button className="cursor-pointer" onClick={() => onValueChange(1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
