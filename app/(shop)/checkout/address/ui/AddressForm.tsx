'use client';

import { deleteAddress, setUserAddress } from "@/actions";
import { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/store/address/address-store";
import clsx from "clsx";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form"

interface FormInputs {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
    rememberAddress: boolean;
}

interface Props {
    countries: Country[];
    user?: User;
    address?: Address;
}


export const AddressForm = ({ countries, user, address }: Props) => {

    const { setAddressData, address: addressStore } = useAddressStore()
    const router = useRouter()

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormInputs>({
        defaultValues: address
    })

    useEffect(() => {
        if (!address) {
            reset(addressStore)
        }
    }, [addressStore])

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        if (!isValid) return

        setAddressData({
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            address2: data.address2,
            zip: data.zip,
            city: data.city,
            country: data.country,
            phone: data.phone,
        })

        const { rememberAddress, ...addressData } = data;

        if (rememberAddress) {
            const resp = await setUserAddress(addressData, user?.id!)
        } else {
            const resp = await deleteAddress(user?.id!)
        }

        router.push('/checkout')
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
            <div className="flex flex-col mb-2">
                <span>Nombres</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('firstName', { required: 'Este campo es requerido' })}
                />
            </div>
            <div className="flex flex-col mb-2">
                <span>Apellidos</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('lastName', { required: 'Este campo es requerido' })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('address', { required: 'Este campo es requerido' })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección 2 (opcional)</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('address2')}
                />
            </div>


            <div className="flex flex-col mb-2">
                <span>Código postal</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('zip', { required: 'Este campo es requerido' })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Ciudad</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('city', { required: 'Este campo es requerido' })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>País</span>
                <select
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('country', { required: 'Este campo es requerido' })}
                >
                    <option value="">[ Seleccione ]</option>
                    {
                        countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="flex flex-col mb-2">
                <span>Teléfono</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('phone', { required: 'Este campo es requerido' })}
                />
            </div>


            <div className="inline-flex items-center">
                <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="checkbox"
                // data-ripple-dark="true"
                >
                    <input
                        type="checkbox"
                        className="border-gray-300 before:content[''] peer relative h-5 w-5 cursor-pointer rounded-md border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                        id="checkbox"
                        {...register('rememberAddress')}
                    />
                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </label>

                <span>¿Recordar dirección?</span>
            </div>

            <div className="inline-flex mb-2 justify-end">
                <button
                    disabled={!isValid}
                    type="submit"
                    // className="btn-primary flex w-full sm:w-1/2 justify-center "
                    className={clsx({
                        'btn-primary flex w-full sm:w-1/2 justify-center ': isValid,
                        'btn-secondary flex w-full sm:w-1/2 justify-center cursor-not-allowed': !isValid
                    })}
                >
                    Siguiente
                </button>
            </div>


        </form>
    )
}
