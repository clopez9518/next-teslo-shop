import { create } from 'zustand'

interface State {
    isMenuOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
}

export const useUiStore = create<State>()((set) => ({
    isMenuOpen: false,
    openMenu: () => set((state) => (state.isMenuOpen ? state : { isMenuOpen: true })),
    closeMenu: () => set((state) => (state.isMenuOpen ? { isMenuOpen: false } : state)),
}))
