'use server';

import { PaypalOrderResponse } from "@/interfaces";

export const paypalCheckPayment = async (transactionId: string) => {
    const authToken = await getPaypalBearerToken();

    if (!authToken) return {
        ok: false,
        message: 'No se pudo obtener el token de autenticación'
    };

    const paypalOrder = await verifyPaypalPayment(transactionId, authToken);

    if (!paypalOrder) return {
        ok: false,
        message: 'No se pudo verificar el pago'
    };

    const { status, purchase_units } = paypalOrder;

    if (status !== 'COMPLETED') return {
        ok: false,
        message: 'El pago no fue completado'
    };

    return {
        ok: true,
        status,
        purchase_units: purchase_units[0]
    }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_SECRET_KEY;
    const oAuth2Url = process.env.PAYPAL_OAUTH_URL;

    console.log({ clientId, clientSecret, oAuth2Url })

    const base64Token = Buffer.from(`${clientId}:${clientSecret}`, 'utf-8').toString('base64');

    try {
        const response = await fetch(`${oAuth2Url}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${base64Token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials',
            cache: 'no-store'
        })

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        return null;
    }
}

const verifyPaypalPayment = async (transactionId: string, authToken: string)
    : Promise<PaypalOrderResponse | null> => {
    const paypalOrdersUrl = process.env.PAYPAL_ORDERS_URL;

    try {
        const response = await fetch(`${paypalOrdersUrl}/${transactionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            cache: 'no-store'
        })

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}