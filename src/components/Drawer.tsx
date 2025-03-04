"use client";
import { useSystemState } from '@/hooks/system.state';
import React from 'react'
import { DynamicIcon } from './DynamicIcon';

export default function Drawer() {

    const { isDrawerOpen, setIsDrawerOpen } = useSystemState();

    const pages = [
        {
            name: "Bots",
            icon: "material-symbols:robot-2-outline",
            path: "/bots"
        },
        {
            name: "Projects",
            icon: "material-symbols:category-outline-rounded",
            path: "/projects"
        },

    ]

    return (

        <section className="flex flex-col items-center justify-top w-[300px] h-screen bg-base-100 z-10 border-r p-4">
            <ul className="menu rounded-box w-full space-y-4">

                {
                    pages.map((page, index) => (
                        <li key={index} className='bg-base-200 rounded-md'>
                            <a href={page.path}>
                                <DynamicIcon icon={page.icon} className="w-6 h-auto" />
                                <span className="text-sm">{page.name}</span>
                            </a>
                        </li>
                    ))
                }

            </ul>
        </section>
    )
}
