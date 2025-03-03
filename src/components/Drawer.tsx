"use client";
import { useSystemState } from '@/hooks/system.state';
import React from 'react'

export default function Drawer() {

    const { isDrawerOpen, setIsDrawerOpen } = useSystemState();


    return (
        <div className="drawer">
            <div className={`drawer-side ${isDrawerOpen ? 'drawer-open' : 'drawer-close'}`}>
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    )
}
