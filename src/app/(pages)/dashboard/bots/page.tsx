"use client";

import { getBots } from "@/api/bot.api";
import { IBot } from "@/models/IBot";
import { useEffect, useState } from "react";
import CardBot from "./components/CardBot";

export default function page() {

    const [bots, setBots] = useState<IBot[]>([]);

    const fetchData = async () => {

        const res = await getBots()
        setBots(res)
        console.log(res);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="flex justify-start">
            {
                bots.map((bot, index) => (
                    <CardBot key={index} bot={bot} />
                ))
            }
        </div>
    )
}
