import { Address } from "@/interfaces/address.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface State {
    address: Address;
    // rememberAddress: boolean;

    setAddressData: (data: Address) => void;
    // getAddressData: () => Address;
}


export const useAddressStore = create<State>()(

    persist((set, get) => ({
        address: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: '',
            phone: '',
        },
        setAddressData: (data: Address) => set({ address: data }),
        // getAddressData: () => get().address,
    }),
        {
            name: 'address-store',
            // storage: createJSONStorage(() => localStorage),
        })
)