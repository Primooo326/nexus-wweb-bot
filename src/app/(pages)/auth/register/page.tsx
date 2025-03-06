"use client";
import { DynamicIcon } from '@components/DynamicIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { registerApi } from '@api/auth.api';
export default function page() {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            contraseñaConfirmacion: '',
            username: '',
        }
    })

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = (data: any) => {

        if (data.password !== data.contraseñaConfirmacion) {
            toast.error('Las contraseñas no coinciden')
            return
        }

        toast.promise(registerApi(data), {
            pending: 'Registrando...',
            error: 'Error al registrar'
        }).then((data) => {
            console.log(data);
            toast.success('Registro exitoso')
            router.push('/auth/login')
        })

    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8 sm:p-20">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <label className="input validator">
                    <DynamicIcon icon="line-md:account" className="text-xl" />
                    <input type="text"
                        className="grow"
                        placeholder="Nombre"
                        {...register('username', {
                            required: true,
                            minLength: {
                                value: 3,
                                message: 'El nombre debe tener al menos 3 caracteres'
                            }
                        })}
                    />
                    <p className="validator-hint">
                        {errors.username?.message}
                    </p>
                </label>
                <label className="input validator">
                    <DynamicIcon icon="line-md:email" className="text-xl" />
                    <input type="text"
                        className="grow"
                        placeholder="Correo"
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Ingrese un correo valido'
                            }
                        })}
                    />
                    <p className="validator-hint">
                        {errors.email?.message}
                    </p>
                </label>
                <label className="input validator">
                    <DynamicIcon icon="line-md:security" className="text-xl" />
                    <input type={showPassword ? 'text' : 'password'}
                        className="grow"
                        placeholder="Contraseña"
                        {...register('password', {
                            required: true,
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            }
                        })}
                    />
                    <p className="validator-hint">
                        {errors.password?.message}
                    </p>
                </label>
                <label className="input validator">
                    <DynamicIcon icon="line-md:security" className="text-xl" />
                    <input type={showPassword ? 'text' : 'password'}
                        className="grow"
                        placeholder="Confirmar contraseña"
                        {...register('contraseñaConfirmacion', {
                            required: true,
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres'
                            },
                        })}
                    />
                    <p className="validator-hint">
                        {errors.contraseñaConfirmacion?.message}
                    </p>
                </label>


                <label className="fieldset-label">
                    <input type="checkbox" className="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
                    Ver contraseña
                </label>
                <p>
                    Ya tienes cuenta? <Link href="/auth/login" className="link">Inicia sesión</Link>
                </p>

                <button className="btn btn-primary" disabled={isLoading}>
                    {
                        isLoading ?
                            <DynamicIcon icon="line-md:loading-twotone-loop" className="text-xl" /> :
                            <DynamicIcon icon="line-md:log-in" className="text-xl" />
                    }
                    Registrar
                </button>
            </form>

        </div>
    )

}
