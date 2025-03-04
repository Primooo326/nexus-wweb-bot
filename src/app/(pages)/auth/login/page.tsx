"use client";
import { login } from '@/api/auth.api';
import { DynamicIcon } from '@components/DynamicIcon'
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useAppState } from '@/hooks/app.state';
import { useRouter } from 'next/navigation';
export default function page() {

    const { setUser } = useAppState();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = (data: any) => {
        toast.promise(login(data), {
            pending: 'Iniciando sesión...',
        }).then((data) => {
            console.log(data);
            const { token, user, message } = data;
            Cookies.set('token', token)
            setUser(user)
            toast.success(message)
            router.push('/dashboard/bots')
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8 sm:p-20">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <label className="input validator">
                    <DynamicIcon icon="line-md:email" className="text-xl" />
                    <input type="text"
                        className="grow"
                        placeholder="Email"
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
                        placeholder="Password"
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
                <label className="fieldset-label">
                    <input type="checkbox" className="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
                    Ver contraseña
                </label>

                <p>
                    Aún no tienes cuenta? <Link href="/auth/register" className="link">Registrate</Link>
                </p>

                <button className="btn btn-primary">
                    <DynamicIcon icon="line-md:log-in" className="text-xl" />
                    Login
                </button>
            </form>

        </div>
    )
}
