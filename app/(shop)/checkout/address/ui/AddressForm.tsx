"use client";

import clsx from "clsx";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { deleteAddress, setUserAddress } from "@/actions";
import { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/store/address/address-store";

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

const inputClassName =
  "mt-2 h-12 w-full border border-neutral-300 bg-white px-4 text-sm outline-none transition-colors focus:border-neutral-950";

const labelClassName = "text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500";
const errorClassName = "mt-2 text-sm font-semibold text-red-600";

export const AddressForm = ({ countries, user, address }: Props) => {
  const { setAddressData, address: addressStore } = useAddressStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      ...(address || addressStore),
      rememberAddress: Boolean(address),
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!isValid) return;

    const { rememberAddress, ...addressData } = data;

    setAddressData({
      firstName: addressData.firstName,
      lastName: addressData.lastName,
      address: addressData.address,
      address2: addressData.address2,
      zip: addressData.zip,
      city: addressData.city,
      country: addressData.country,
      phone: addressData.phone,
    });

    if (user?.id) {
      if (rememberAddress) {
        await setUserAddress(addressData, user.id);
      } else {
        await deleteAddress(user.id);
      }
    }

    router.push("/checkout");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="firstName" className={labelClassName}>
          Nombres
        </label>
        <input
          id="firstName"
          type="text"
          className={clsx(inputClassName, errors.firstName && "border-red-500 focus:border-red-500")}
          {...register("firstName", { required: "Este campo es requerido" })}
        />
        {errors.firstName?.message && <p className={errorClassName}>{errors.firstName.message}</p>}
      </div>

      <div>
        <label htmlFor="lastName" className={labelClassName}>
          Apellidos
        </label>
        <input
          id="lastName"
          type="text"
          className={clsx(inputClassName, errors.lastName && "border-red-500 focus:border-red-500")}
          {...register("lastName", { required: "Este campo es requerido" })}
        />
        {errors.lastName?.message && <p className={errorClassName}>{errors.lastName.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="address" className={labelClassName}>
          Dirección
        </label>
        <input
          id="address"
          type="text"
          className={clsx(inputClassName, errors.address && "border-red-500 focus:border-red-500")}
          {...register("address", { required: "Este campo es requerido" })}
        />
        {errors.address?.message && <p className={errorClassName}>{errors.address.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="address2" className={labelClassName}>
          Dirección 2
        </label>
        <input
          id="address2"
          type="text"
          placeholder="Departamento, oficina o referencia"
          className={`${inputClassName} placeholder:text-neutral-400`}
          {...register("address2")}
        />
      </div>

      <div>
        <label htmlFor="zip" className={labelClassName}>
          Código postal
        </label>
        <input
          id="zip"
          type="text"
          className={clsx(inputClassName, errors.zip && "border-red-500 focus:border-red-500")}
          {...register("zip", { required: "Este campo es requerido" })}
        />
        {errors.zip?.message && <p className={errorClassName}>{errors.zip.message}</p>}
      </div>

      <div>
        <label htmlFor="city" className={labelClassName}>
          Ciudad
        </label>
        <input
          id="city"
          type="text"
          className={clsx(inputClassName, errors.city && "border-red-500 focus:border-red-500")}
          {...register("city", { required: "Este campo es requerido" })}
        />
        {errors.city?.message && <p className={errorClassName}>{errors.city.message}</p>}
      </div>

      <div>
        <label htmlFor="country" className={labelClassName}>
          País
        </label>
        <select
          id="country"
          className={clsx(inputClassName, errors.country && "border-red-500 focus:border-red-500")}
          {...register("country", { required: "Este campo es requerido" })}
        >
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country?.message && <p className={errorClassName}>{errors.country.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className={labelClassName}>
          Teléfono
        </label>
        <input
          id="phone"
          type="text"
          className={clsx(inputClassName, errors.phone && "border-red-500 focus:border-red-500")}
          {...register("phone", { required: "Este campo es requerido" })}
        />
        {errors.phone?.message && <p className={errorClassName}>{errors.phone.message}</p>}
      </div>

      <div className="flex items-center gap-3 border-y border-neutral-200 py-5 sm:col-span-2">
        <input
          id="rememberAddress"
          type="checkbox"
          className="h-5 w-5 accent-neutral-950"
          {...register("rememberAddress")}
        />
        <label htmlFor="rememberAddress" className="text-sm font-semibold text-neutral-700">
          Recordar dirección para futuras compras
        </label>
      </div>

      <div className="sm:col-span-2 sm:flex sm:justify-end">
        <button
          disabled={!isValid || isSubmitting}
          type="submit"
          className={clsx(
            "flex h-12 w-full items-center justify-center bg-neutral-950 px-8 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[(--primary)] sm:w-auto",
            (!isValid || isSubmitting) && "cursor-not-allowed opacity-50 hover:bg-neutral-950"
          )}
        >
          {isSubmitting ? "Guardando..." : "Continuar"}
        </button>
      </div>
    </form>
  );
};
