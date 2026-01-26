import Link from "next/link"

export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link href="/">
                <span>Teslo </span>
                <span> | Shop </span>
                <span>© {new Date().getFullYear()}. Todos los derechos reservados.</span>
            </Link>

            <Link className="mx-2" href="/terms">
                <span>Términos y Condiciones</span>
            </Link>

            <Link className="mx-2" href="/privacy">
                <span>Privacidad</span>
            </Link>
        </div>
    )
}
