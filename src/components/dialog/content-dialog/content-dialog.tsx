import { Beer } from "lucide-react"
import { useEffect, useRef } from "react"

import { Button } from "@/components/button"
import { useDisclosure } from "@/hooks/use-disclosure"
import { type ReactNode } from "react"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../dialog"

export type ContentDialogProps = {
    triggerButton: React.ReactElement
    confirmButton: React.ReactElement
    content: ReactNode,
    title: string,
    cancelButtonText?: string, 
    isDone?: boolean,
}

export const ContentDialog = ({
    triggerButton,
    confirmButton,
    content,
    title,
    cancelButtonText = "Cancel", 
    isDone = false,
    
}: ContentDialogProps) => {
    const { close, open, isOpen } = useDisclosure()
    const cancelButtonRef = useRef(null)

    useEffect(() => {
        if (isDone) {
            close()
        }
    }, [isDone, close])

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    close()
                } else {
                    open()
                }
            }}
        >
            <DialogTrigger asChild>{triggerButton}</DialogTrigger>
            <DialogContent className="bg-amber-100 sm:max-w-[425px]">
                <DialogHeader className="flex">
                    <DialogTitle className="flex items-center gap-2">
                        {" "}
                        <Beer
                                className="size-6 text-yellow-400 "
                                aria-hidden="true"
                            />
                        {title}
                    </DialogTitle>
                </DialogHeader>

                {content}

                <DialogFooter>
                    {confirmButton}
                    <Button ref={cancelButtonRef} variant="outline" onClick={close}>
                        {cancelButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}