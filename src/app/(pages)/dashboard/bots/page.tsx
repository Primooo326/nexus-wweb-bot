"use client";

import { getBotsByUser } from "@/api/bot.api";
import { useEffect, useState } from "react";
import CardBot from "./components/CardBot";
import { useAppState } from "@/hooks/app.state";
import { BotStatus, IBot } from "@/models/app.model";
import { DynamicIcon } from "@/components/DynamicIcon";
import ModalEditBot from "./components/ModalEditBot";

export default function page() {

    const [bots, setBots] = useState<IBot[]>([]);
    const [botEdit, setBotEdit] = useState<IBot | null>(null)


    const { user } = useAppState()
    const fetchData = async () => {

        const res = await getBotsByUser(user!.id)
        console.log(res);
        setBots(res)
    }

    const handleNewBot = () => {
        setBotEdit({
            id: '',
            user_id: user!.id,
            name: '',
            description: '',
            status: BotStatus.ACTIVE,
            created_at: new Date(),
            updated_at: new Date()
        })
    }

    useEffect(() => {
        if (user) fetchData()
    }, [user])

    return (

        <>
            <h1 className="text-3xl font-bold">
                Tus bots
            </h1>
            <div className="flex justify-start cursor-pointer">
                {
                    bots.map((bot, index) => (
                        <CardBot key={index} bot={bot} />
                    ))
                }
                <div className="card card-compact p-4 bg-base-100 shadow-md w-64 h-auto space-y-4 flex justify-center items-center" onClick={handleNewBot}>

                    <DynamicIcon icon="line-md:plus-circle" className="text-3xl" />
                    <p>
                        Crear Bot
                    </p>
                </div>
            </div>

            {botEdit && <ModalEditBot bot={botEdit} onClose={() => setBotEdit(null)} />}
        </>

    )
}

