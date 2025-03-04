import Modal from '@/components/Modal/Modal'
import React from 'react'
import QrCode from './QrCode'

export default function ModalQrCode({ qrData }: { qrData: string }) {
    return (
        <Modal id='modal-qr-code' isOpen={true} onClose={() => { }} className='p-8 rounded flex flex-col justify-center items-center space-y-4' >
            <QrCode data={qrData} />

            <h1 className='text-lg font-bold'>
                Escanea el código QR con tu dispositivo móvil para iniciar la sesión
            </h1>

            <button className='btn btn-primary btn-block'>
                Cancelar
            </button>
        </Modal>
    )
}
