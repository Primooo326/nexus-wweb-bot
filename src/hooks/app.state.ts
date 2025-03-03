import { IUser } from "@/models/IUser";
import { create } from "zustand";

interface IAppState {
    user: IUser | null;
    setUser: (user: IUser | null) => void;

    sessionId: string | null;
    setSessionId: (sessionId: string | null) => void;

}

export const useAppState = create<IAppState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),

    sessionId: null,
    setSessionId: (sessionId) => set({ sessionId }),
}));