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
                const { payload }: any = await verifyJwt(token);
                console.log(payload);
                setUser({ ...payload });
                socket.emit('authenticate', payload.id)
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
        <main data-theme={dataTheme} className="flex w-screen h-screen overflow-hidden">
            <Drawer />
            <div className="flex flex-col gap-4 p-4 sm:p-8 w-full">

                {children}
            </div>
            <ToastContainer />
        </main>
    )
}
