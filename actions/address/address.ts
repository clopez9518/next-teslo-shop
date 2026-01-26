'use server';

import { prisma } from "@/app/lib/prisma";
import { Address } from "@/interfaces";


export const setUserAddress = async (address: Address, userId: string) => {

    try {
        const userAddress = await createOrReplaceAddress(address, userId)

        return {
            ok: true,
            message: 'Dirección guardada correctamente',
            userAddress
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Error al guardar la dirección'
        }
    }


}

export const createOrReplaceAddress = async (address: Address, userId: string) => {

    try {
        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        })

        const addressData = {
            name: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            zip: address.zip,
            city: address.city,
            countryId: address.country,
            phone: address.phone,
            userId
        }

        if (!storedAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressData
            })

            return newAddress
        }

        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId
            },
            data: addressData
        })

        return updatedAddress

    } catch (error) {
        throw new Error('Error al guardar la dirección')
    }

}

export const deleteAddress = async (userId: string) => {
    try {
        const deletedAddress = await prisma.userAddress.delete({
            where: {
                userId
            }
        })

        return {
            ok: true,
            message: 'Dirección eliminada correctamente',
            deletedAddress
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Error al eliminar la dirección'
        }
    }
}

export const getAddress = async (userId: string) => {
    try {
        const address = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        })

        if (!address) return null

        const addressData: Address = {
            firstName: address.name,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2 || '',
            zip: address.zip,
            city: address.city,
            country: address.countryId,
            phone: address.phone,
        }

        return {
            ok: true,
            message: 'Dirección obtenida correctamente',
            address: addressData
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Error al obtener la dirección'
        }
    }
}