"use client";
import Drawer from '@/components/Drawer';
import useSocketStore from '@/hooks/socketAlert.state';
import { useSystemState } from '@/hooks/system.state';
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { useAppState } from '@/hooks/app.state';
import { verifyJwt } from '@/tools';
import { useRouter } from 'next/navigation';
export default function DashobarLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const { dataTheme } = useSystemState();
    const { initSocket, socket, } = useSocketStore();
    const { setUser } = useAppState();
    const router = useRouter();
    const fetchJwt = async () => {

        try {
            const token = Cookies.get('token');
            if (token) {
                const { payload } = await verifyJwt(token);
                console.log(payload);
                const { correo, nombre, uuid, telefono } = payload as any;
                setUser({ correo, nombre, uuid, telefono });
                socket.emit('authenticate', uuid)
            }
        } catch (error) {
            console.log(error);
            router.push('/auth/login')
        }

    }

    useEffect(() => {
        initSocket();
    }, []);

    useEffect(() => {
        if (socket) {
            fetchJwt()
        }
    }, [socket]);

    return (
        <main data-theme={dataTheme} className="p-4 sm:p-8">
            {children}
            <Drawer />
            <ToastContainer />
        </main>
    )
}
