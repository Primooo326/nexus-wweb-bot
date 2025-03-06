import { DynamicIcon } from '@/components/DynamicIcon'
import Modal from '@/components/Modal/Modal'
import { IBot } from '@/models/app.model'
import React from 'react'
import { useForm } from 'react-hook-form'

interface ModalEditBotProps {
  bot: IBot,
  onClose: () => void
}

export default function ModalEditBot({ bot, onClose }: ModalEditBotProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: bot.name,
      description: bot.description,
    }
  })

  const handleOnClose = () => {
    onClose()
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Modal id='modal-edit' isOpen={true} onClose={() => { }} className='w-[70%] h-[70%]rounded' >
      <div className="modal-header flex justify-between items-center border-b w-full gap-2 px-10">
        <h1 className="text-2xl font-bold">Nuevo Bot</h1>
        <button onClick={handleOnClose}>
          <DynamicIcon icon="maki:cross" />
        </button>
      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="input validator">
          <DynamicIcon icon="line-md:account" className="text-xl" />
          <input type="text"
            className="grow"
            placeholder="Nombre del bot"
            {...register('name', {
              required: true,
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres'
              }
            })}
          />
          <p className="validator-hint">
            {errors.name?.message}
          </p>
        </label>
        <textarea
          className="textarea grow"
          placeholder="Descripcion del bot"
          {...register('description', {
            required: true,
            minLength: {
              value: 3,
              message: 'La descripcion debe tener al menos 3 caracteres'
            }
          })}
        />
        <p className="validator-hint">
          {errors.name?.message}
        </p>
      </form>
    </Modal>
  )
}
