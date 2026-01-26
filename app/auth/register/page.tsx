import { montserratAlternates } from '@/config/fonts';
import Link from 'next/link';
import { RegisterForm } from './ui/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

            <h1 className={`${montserratAlternates.className} text-4xl mb-5`}>Registrarse</h1>

            <RegisterForm />
        </div>
    );
}