"use client";
import { useAppState } from '@/hooks/app.state';
import React, { useEffect, useState } from 'react'
import QrCode from './components/QrCode';
import useSocketStore from '@/hooks/socketAlert.state';
import { toast } from 'react-toastify';
export default function page() {

    const [showQrCode, setShowQrCode] = useState(false)
    const [qrData, setQrData] = useState('')
    const { user } = useAppState();
    const { socket, status } = useSocketStore();
    const [sessionStatus, setSessionStatus] = useState(false)
    const [onSession, setOnSession] = useState(true)
    const handleStartSession = () => {
        socket.emit('start_session', user!.uuid)
        setShowQrCode(true)
    }

    const deleteBot = () => {
        socket.emit('destroy_session', user!.uuid)
    }

    useEffect(() => {
        if (status && user) {
            socket.on('qr', (data: any) => {
                setQrData(data.qr)
            })

            socket.on('session_ready', (data: any) => {
                console.log(data);
                setShowQrCode(false)
                setSessionStatus(true)
                toast.success('Sesión iniciada exitosamente')
            })

            socket.on('session_authenticated', (data: any) => {
                console.log(data);
                toast.success('Sesión autenticada exitosamente')
            })

            socket.on('session_auth_failure', (data: any) => {
                console.log(data);
            })

            socket.on('session_status', (data: any) => {
                setSessionStatus(data.isReady)
                setOnSession(false)
                console.log(data);
            })

            socket.on('session_destroyed', (data: any) => {
                console.log(data);
                toast.success('Bot eliminado exitosamente')
                setSessionStatus(false)
            })

            socket.emit("check_session", user.uuid)
        } else {
            setSessionStatus(false)
            setOnSession(true)
        }
        console.log("status", status);
    }, [status, user])

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8 sm:p-20">

            {
                onSession ? <>
                    <div>
                        Cargando sesión...
                    </div>
                </> : <>
                    {
                        sessionStatus ?
                            <div className="flex flex-col items-center justify-center gap-4 p-8 sm:p-20">
                                Bot Activo

                                <button className="btn btn-primary" onClick={() => deleteBot()}>
                                    Eliminar Bot
                                </button>

                            </div> :
                            <>
                                <button className="btn btn-primary" onClick={() => handleStartSession()}>
                                    Iniciar registro de WhatsApp
                                </button>

                                {
                                    showQrCode &&
                                    <div className="flex flex-col items-center justify-center gap-4 p-8 sm:p-20">
                                        {qrData ? <QrCode data={qrData} /> : <div>Iniciando bot...</div>}
                                    </div>
                                }
                            </>
                    }
                </>
            }

        </div>
    )
}
