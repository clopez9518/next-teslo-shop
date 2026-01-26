import { Geist, Geist_Mono, Montserrat_Alternates } from "next/font/google";

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const montserratAlternates = Montserrat_Alternates({
    variable: "--font-montserrat-alternates",
    subsets: ["latin"],
    weight: ["500", "700"],
});