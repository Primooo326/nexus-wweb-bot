import { create } from "zustand";

interface ISystemState {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isDrawerOpen: boolean) => void;

    dataTheme: "emerald" | "dark",
    setDataTheme: (dataTheme: "emerald" | "dark") => void;

}

export const useSystemState = create<ISystemState>((set) => ({
    isDrawerOpen: false,
    setIsDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),

    dataTheme: "emerald",
    setDataTheme: (dataTheme) => set({ dataTheme }),
}));