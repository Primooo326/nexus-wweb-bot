"use client";
import { getJobsByBot } from '@/api/jobsMessages';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import ModalEdit from '../components/ModalEdit';
import { toast } from 'react-toastify';
import { useAppState } from '@/hooks/app.state';
import useSocketStore from '@/hooks/socketAlert.state';
import QrCode from '../components/QrCode';
import ModalQrCode from '../components/ModalQrCode';

export default function page() {

    const { id } = useParams()

    const [data, setData] = useState<any>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fetchData = async () => {

        const jobsBot = await getJobsByBot(id as string)
        setData(jobsBot)
        console.log(jobsBot);

    }

    const [showQrCode, setShowQrCode] = useState(false)
    const [qrData, setQrData] = useState('')
    const { socket, status } = useSocketStore();
    const [sessionStatus, setSessionStatus] = useState(false)
    const [onSession, setOnSession] = useState(true)
    const handleStartSession = () => {
        socket.emit('start_session', id)
        setShowQrCode(true)
    }

    const deleteBot = () => {
        socket.emit('destroy_session', id)
    }

    useEffect(() => {
        if (status && id) {
            socket.on('qr', (data: any) => {
                setQrData(data.qr)
                console.log(data);
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

            socket.emit("check_session", id)
        } else {
            setSessionStatus(false)
            setOnSession(true)
        }
        console.log("status", status);
    }, [status, id])

    useEffect(() => {
        fetchData()
    }, [id])

    const renderStatus = (status: string) => {
        switch (status) {
            case "enviado":
                return <span className="badge badge-success">Enviado</span>
            case "fallido":
                return <span className="badge badge-error">Fallido</span>
            default:
                return <span className="badge badge-warning">Pendiente</span>
        }
    }

    const columns: any = [

        {
            name: 'Mensaje',
            selector: 'mensaje',
            sortable: true,
            cell: (row: any) => row.mensaje
        },
        {
            name: 'Fecha',
            selector: 'creadoEn',
            sortable: true,
            cell: (row: any) => row.creadoEn
        },
        {
            name: 'Estado',
            selector: 'status',
            sortable: true,
            cell: (row: any) => renderStatus(row.status)
        },
        {
            name: 'Acciones',
            selector: 'acciones',
            sortable: false,
            cell: (row: any) => (
                <div className='flex gap-2'>
                    <button className="btn btn-warning">
                        Editar
                    </button>
                    <button className="btn btn-error">
                        Eliminar
                    </button>
                </div>
            )
        }

    ]

    return (
        <div className="w-full space-y-8">

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">

                    <h1 className="text-2xl font-bold">
                        Bot
                    </h1>
                    <span className={`${sessionStatus ? "badge badge-success" : "badge badge-error"}`}>
                        {sessionStatus ? "Activo" : "Inactivo"}
                    </span>
                </div>
                <div className="">

                    {
                        onSession ? <>
                            <div>
                                Cargando sesión...
                            </div>
                        </> : <>
                            {
                                sessionStatus ?

                                    <button className="btn btn-warning" onClick={() => deleteBot()}>
                                        Eliminar Bot
                                    </button>

                                    :
                                    <>
                                        <button className="btn btn-primary" onClick={() => handleStartSession()}>
                                            {showQrCode ? "Iniciando sesión..." : "Iniciar sesión"}
                                        </button>

                                        {
                                            showQrCode && qrData && <ModalQrCode qrData={qrData} />
                                        }
                                    </>
                            }
                        </>
                    }

                </div>
            </div>
            <div>

                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">
                        Mensajes programados
                    </h1>
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                        Crear mensaje
                    </button>
                </div>
                <DataTable
                    className="w-full"
                    columns={columns}
                    data={data}
                    noDataComponent={<div className='flex flex-col justify-center my-8'>
                        <div>No hay datos disponibles</div>
                    </div>}
                    progressComponent={
                        <div className="flex flex-col justify-center gap-5 items-center">
                            <span className="loading loading-spinner loading-lg" />
                            Cargando datos...
                        </div>
                    }
                    fixedHeader={true}
                    pagination
                />
            </div>

            {isModalOpen && <ModalEdit />}

        </div>
    )
}
