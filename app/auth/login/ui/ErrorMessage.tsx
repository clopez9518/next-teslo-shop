import { IoInformationCircleOutline } from "react-icons/io5"

export const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className="flex items-center justify-center w-full text-center mb-5">
            <IoInformationCircleOutline className="text-red-500 h-5 w-5" />
            <p className="text-sm text-red-500">{message}</p>
        </div>
    )
}
