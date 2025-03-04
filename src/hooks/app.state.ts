import { IUsuario } from "@/models/IUsuario";
import { create } from "zustand";

interface IAppState {
    user: IUsuario | null;
    setUser: (user: IUsuario | null) => void;

    sessionId: string | null;
    setSessionId: (sessionId: string | null) => void;

}

export const useAppState = create<IAppState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),

    sessionId: null,
    setSessionId: (sessionId) => set({ sessionId }),
}));