import Modal from '@/components/Modal/Modal';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function ModalEdit() {

    const [archivos, setArchivos] = useState<any[]>([]);
    const [destinatarios, setDestinatarios] = useState<any[]>([]);
    const [archivosAdjuntos, setArchivosAdjuntos] = useState<any[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            mensaje: '',
        }
    })

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <Modal id='modal-edit' isOpen={true} onClose={() => { }} className='w-[70%] h-[70%] p-8 rounded' >
            <div className='flex w-full h-full' >
                <div className='w-full h-full space-y-4'>
                    <h1 className="text-2xl font-bold">
                        Mensaje
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <textarea rows={5}
                            className='textarea textarea-bordered w-full'
                            placeholder="Mensaje"
                            {...register('mensaje', {
                                required: true,
                                minLength: {
                                    value: 5,
                                    message: 'La longitud mínima es de 5 caracteres'
                                }
                            })}
                        />

                    </form>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className='w-full h-full space-y-4'>
                    <h1 className="text-2xl font-bold">
                        Destinatarios
                    </h1>
                    <div className="flex flex-col gap-4">

                    </div>
                </div>
            </div>
        </Modal>
    )
}
