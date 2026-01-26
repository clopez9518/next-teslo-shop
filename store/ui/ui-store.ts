import { create } from 'zustand'

interface State {
    isMenuOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
}

export const useUiStore = create<State>()((set) => ({
    isMenuOpen: false,
    openMenu: () => set((state) => ({ isMenuOpen: true })),
    closeMenu: () => set((state) => ({ isMenuOpen: false })),
}))
