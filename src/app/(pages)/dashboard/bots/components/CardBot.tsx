import { IBot } from '@/models/IBot'
import Link from 'next/link'
import React from 'react'

interface CardBotProps {
    bot: IBot
}

export default function CardBot({ bot }: CardBotProps) {

    return (
        <div className="card card-compact p-4 bg-base-100 shadow-md w-64 h-auto space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="card-title">
                    {bot.nombre}
                </h1>
                <span className={`${bot.status === "activo" ? "badge badge-success" : "badge badge-error"}`}>
                    {bot.status}
                </span>
            </div>
            <p>
                {bot.descripcion}
            </p>

            <Link className="btn btn-warning" href={`/dashboard/bots/${bot.uuid}`}>
                Ingresar
            </Link>

        </div>
    )
}
