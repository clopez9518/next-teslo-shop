import { IoLogOutOutline } from "react-icons/io5"
import { useUiStore } from "@/store";
import { signOut } from "next-auth/react";

export const LogoutItem = () => {

    const { closeMenu } = useUiStore();

    const handleLogout = async () => {
        closeMenu();
        await signOut();
    }

    return (
        <button onClick={handleLogout} className="w-full">
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 mt-5 rounded transition-all">
                <IoLogOutOutline className="w-6 h-6" />
                <p>Logout</p>
            </div>
        </button>
    )
}
