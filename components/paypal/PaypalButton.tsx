'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";
import { setOrderCompleted } from "@/actions/order/set-order-completed";


interface Props {
    orderId: string;
    amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer();

    const roundedAmount = Math.round(amount * 100) / 100;

    if (isPending) return (
        <div className="animate-pulse flex flex-col w-full bg-gray-200">
            <div className="h-10 rounded bg-gray-400 w-full"></div>
            <div className="h-10 rounded bg-gray-400 w-full mt-3"></div>
        </div>
    )

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionId = await actions.order.create({
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        currency_code: 'USD',
                        value: roundedAmount.toString()
                    },
                }
            ],
            intent: 'CAPTURE'
        })

        //Todo: actualizar el transactionId en la orden
        const { ok } = await setTransactionId(orderId, transactionId);

        if (!ok) {
            throw new Error('Error al actualizar la orden');
        }

        return transactionId;
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {

        const details = await actions.order?.capture();
        if (!details) return;

        const { ok: okPaypal, purchase_units } = await paypalCheckPayment(details.id!);

        if (!okPaypal) {
            throw new Error('Error al verificar el pago');
        }

        if (!purchase_units) {
            throw new Error('Error al verificar el pago');
        }

        const { ok, order } = await setOrderCompleted(purchase_units.invoice_id);

        if (!ok) {
            throw new Error('Error al actualizar el estado de la orden');
        }

        console.log({ order })
    }

    return (

        <div className="relative z-0">
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>
    )
}
