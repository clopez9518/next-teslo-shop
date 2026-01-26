import { montserratAlternates } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={`${montserratAlternates.className} text-4xl mb-5`}>Ingresar</h1>

      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}