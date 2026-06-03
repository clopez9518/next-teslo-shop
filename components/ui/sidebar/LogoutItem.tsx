import { IoLogOutOutline } from "react-icons/io5";
import { useUiStore } from "@/store";
import { signOut } from "next-auth/react";

export const LogoutItem = () => {
  const closeMenu = useUiStore((state) => state.closeMenu);

  const handleLogout = async () => {
    closeMenu();
    await signOut();
  };

  return (
    <button
      onClick={handleLogout}
      className="group flex h-12 w-full items-center justify-between border-b border-neutral-200 text-left text-sm font-semibold transition-colors hover:border-neutral-950"
      type="button"
    >
      <span className="flex items-center gap-3">
        <IoLogOutOutline className="h-5 w-5 text-neutral-500 transition-colors group-hover:text-neutral-950" />
        Logout
      </span>
      <span className="text-xs uppercase tracking-[0.18em] text-neutral-400 transition-colors group-hover:text-neutral-950">
        Salir
      </span>
    </button>
  );
};
