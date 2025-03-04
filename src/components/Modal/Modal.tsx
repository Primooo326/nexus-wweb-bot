import type React from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import "./modal.css"

export interface ModalProps {
    children: React.ReactNode;
    id: string;
    isOpen: boolean;
    className?: string;
    canCloseEsc?: boolean;
    canCloseOut?: boolean;
    onClose: () => void;
}

export default function Modal({
    children,
    id,
    className,
    isOpen,
    canCloseEsc = false,
    canCloseOut = false,
    onClose,
}: ModalProps) {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 27 && canCloseEsc) {
            onClose();
        }
    };

    const handleClickOut = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).id === id && canCloseOut) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, canCloseEsc]);

    if (!isOpen) return null;

    // Usamos createPortal para renderizar en el body
    return createPortal(
        <section id={id} className="modale" onClick={handleClickOut}>
            <div className={`modal-content ${className}`}>{children}</div>
        </section>,
        document.body
    );
}