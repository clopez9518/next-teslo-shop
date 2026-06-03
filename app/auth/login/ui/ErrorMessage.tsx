import { IoInformationCircleOutline } from "react-icons/io5";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-2 border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
      <IoInformationCircleOutline className="h-5 w-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
};
