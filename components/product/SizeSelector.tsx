import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize: Size | null;
    sizes: Size[];
    onSizeChange: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, sizes, onSizeChange }: Props) => {
    return (
        <div className="mb-3">
            <h3 className="text-sm font-bold">Size</h3>
            <div className="flex gap-2">
                {
                    sizes.map((size) => (
                        <button
                            key={size}
                            className={clsx(
                                'px-2 py-1 rounded text-sm font-semibold cursor-pointer hover:bg-gray-200',
                                size === selectedSize && 'underline'
                            )}
                            onClick={() => onSizeChange(size)}
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
