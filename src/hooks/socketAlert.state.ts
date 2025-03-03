import { create } from 'zustand';
import io from 'socket.io-client';
import { API_URL } from '@/config';
import { toast } from 'react-toastify';

interface SocketState {
    socket: any;
    initSocket: () => void;
    disconnectSocket: () => void;
    status: boolean;
}

const useSocketStore = create<SocketState>((set) => ({
    socket: null,
    status: false,
    initSocket: () => {
        // Primero desconectar cualquier socket existente
        useSocketStore.getState().disconnectSocket();

        // Obtener la URL base sin 'api/'
        const url = `${API_URL.replace('/api', '')}`;

        // Conectar al namespace raíz (/) explícitamente
        const socket = io(url, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            withCredentials: true,
        });

        set({ socket });

        socket.on("connect", () => {
            set({ status: true })
            console.log("Socket conectado con ID:", socket.id);
            toast.success("Conectado al servidor");
        });

        socket.on("disconnect", (reason) => {
            console.info("Socket desconectado:", reason);
            toast.info("Desconectado del servidor");
        });

        socket.on("connect_error", (error) => {
            console.error("Error de conexión:", error);
            toast.error("Error al conectar con el servidor");
        });
    },
    disconnectSocket: () => {
        try {
            set((state) => {
                if (state.socket) {
                    state.socket.disconnect();
                    console.log("Socket desconectado manualmente");
                }
                return { socket: null, status: false };
            });
        } catch (error) {
            console.error("Error al desconectar socket:", error);
        }
    },
}));

export default useSocketStore;