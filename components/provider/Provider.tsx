'use client';

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface Props {
    children: React.ReactNode;
    session?: Session | null;
}

export const Provider = ({ children, session }: Props) => {
    return (
        <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
            currency: "USD",
            intent: "capture"
        }} >
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </PayPalScriptProvider>
    )
}
