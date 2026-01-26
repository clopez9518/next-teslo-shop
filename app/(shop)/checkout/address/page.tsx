export const revalidate = 604800; // 7 days

import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries } from '@/actions/countries/get-countries';
import { auth } from '@/auth.config';
import { getAddress } from '@/actions/address/address';

export default async function AddressPage() {
    const countries = await getCountries();
    const session = await auth()
    const user = session?.user

    const { address } = await getAddress(user?.id!) || { address: undefined }


    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

                <Title title="Dirección" subtitle="Dirección de entrega" />
                <AddressForm countries={countries} user={session?.user} address={address} />
            </div>
        </div>
    );
}