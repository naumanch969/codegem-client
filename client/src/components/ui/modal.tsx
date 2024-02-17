"use client"

import React, { FC, ReactNode } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ModalProps {
    title: string,
    description: string,
    className?: string,
    isOpen: boolean,
    onClose: () => void,
    children?: ReactNode
}

export const Modal: FC<ModalProps> = ({
    title, description, className, isOpen, onClose, children
}) => {

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}  >
            <DialogContent className={cn("", className)} >
                <DialogHeader  >
                    <DialogTitle className='text-lg' >{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className={"max-h-[80vh] overflow-y-auto pr-1 "} >
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}