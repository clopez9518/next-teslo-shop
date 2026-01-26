import React from 'react'


export const CartSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">

            {/* Carrito */}
            <div className="flex flex-col mt-5">
                {/* Título */}
                <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-40 bg-gray-200 rounded mb-5"></div>

                {/* Items */}
                {[1].map((i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 mb-4 p-4 rounded-lg"
                    >
                        {/* Imagen */}
                        <div className="w-20 h-20 bg-gray-200 rounded"></div>

                        {/* Info */}
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout */}
            <div>
                <div className="bg-white rounded-xl shadow-xl p-7 sm:mt-5 space-y-4">
                    {/* Título */}
                    <div className="h-6 w-56 bg-gray-200 rounded"></div>

                    {/* Resumen */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <React.Fragment key={i}>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                <div className="h-4 w-20 bg-gray-200 rounded justify-self-end"></div>
                            </React.Fragment>
                        ))}

                        {/* Total */}
                        <div className="h-6 w-32 bg-gray-300 rounded"></div>
                        <div className="h-6 w-24 bg-gray-300 rounded justify-self-end"></div>
                    </div>

                    {/* Botones */}
                    <div className="mt-5 space-y-3">
                        <div className="h-10 w-full bg-gray-300 rounded"></div>
                        <div className="h-4 w-40 bg-gray-200 rounded ml-auto"></div>
                    </div>
                </div>
            </div>

        </div>

    )
}
