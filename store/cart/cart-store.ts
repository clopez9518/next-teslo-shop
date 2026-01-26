import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    //properties    
    cart: CartProduct[];
    isModalOpen: boolean;
    summary: {
        totalItems: number;
        subTotal: number;
        tax: number;
        total: number;
        shipping: number;
    }

    //methods
    addProductToCart: (product: CartProduct) => void;
    removeProductFromCart: (product: CartProduct) => void;
    getTotalItems: () => number;
    updateProductQuantity: (product: CartProduct) => void;
    getTotalPrice: () => number;
    getSummary: () => {
        totalItems: number;
        subTotal: number;
        tax: number;
        total: number;
        shipping: number;
    };
    setIsModalOpen: (open: boolean) => void;
    clearCart: () => void;
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],
            isModalOpen: false,
            summary: {
                totalItems: 0,
                subTotal: 0,
                tax: 0,
                total: 0,
                shipping: 0,
            },
            addProductToCart: (product) => set((state) => {
                const productInCart = state.cart.some(
                    (item) => item.id === product.id && item.size === product.size
                );

                if (!productInCart) {
                    const cart = [...state.cart, product];
                    return { cart };
                }

                const cart = state.cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity };
                    }
                    return item;
                });

                return { cart };
            }),

            removeProductFromCart: (product) => set((state) => {
                const { cart } = get()
                const updatedCartProducts = cart.filter((item) => item.id !== product.id || item.size !== product.size)

                return { cart: updatedCartProducts }
            }),


            getTotalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),

            updateProductQuantity: (product) => set((state) => {
                const cart = state.cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: product.quantity };
                    }
                    return item;
                });
                return { cart };
            }),

            getTotalPrice: () => get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),

            getSummary: () => {
                const { cart } = get()
                const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
                const tax = subTotal * 0.19
                const total = subTotal + tax
                const shipping = total > 100 ? 0 : 10
                const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

                return {
                    totalItems,
                    subTotal,
                    tax,
                    total,
                    shipping,
                }
            },

            setIsModalOpen: (open: boolean) => set((state) => {
                return { isModalOpen: open }
            }),

            clearCart: () => set((state) => {
                return { cart: [] }
            }),

        })
        , {
            name: 'cart',
        }
    )


)