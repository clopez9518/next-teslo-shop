export const revalidate = 604800; // 7 days

import { AddressForm } from "./ui/AddressForm";
import { auth } from "@/auth.config";
import { getAddress } from "@/actions/address/address";
import { getCountries } from "@/actions/countries/get-countries";

export default async function AddressPage() {
  const countries = await getCountries();
  const session = await auth();
  const user = session?.user;
  const addressResponse = user?.id ? await getAddress(user.id) : null;
  const address = addressResponse?.ok ? addressResponse.address : undefined;

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <section className="-mx-2 border-y border-neutral-200 bg-[#f6f6f2] px-6 py-10 sm:-mx-10 sm:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Checkout
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-none sm:text-7xl">
            Dirección
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Completa los datos de entrega para calcular el despacho y preparar tu orden.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-8 border-b border-neutral-200 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Datos de envío
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Entrega</h2>
          </div>
          <AddressForm countries={countries} user={user} address={address} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-neutral-200 bg-neutral-950 p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Paso 1 de 2
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Envío seguro</h2>
            <p className="mt-5 text-sm leading-6 text-white/65">
              Usa una dirección completa y un teléfono activo para coordinar la entrega
              sin retrasos.
            </p>
            <div className="mt-8 grid gap-4 border-t border-white/15 pt-6 text-sm text-white/65">
              <span>Datos protegidos</span>
              <span>Resumen antes de pagar</span>
              <span>Dirección editable</span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
