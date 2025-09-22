import {
    Overlay,
    Root,
    Trigger,
    Portal,
    Content,
    Close,
    Title,
    Description,
} from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { cn } from "@/utils/cn"
import { type ComponentPropsWithRef, type ComponentProps } from "react"

const Dialog = Root

const DialogTrigger = Trigger

const DialogPortal = Portal

const DialogClose = Close

type DialogOverlayProps = ComponentPropsWithRef<typeof Overlay>

const DialogOverlay = ({ className, ref, ...props }: DialogOverlayProps) => (
    <Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
)
DialogOverlay.displayName = Overlay.displayName

type DialogContentProps = ComponentPropsWithRef<typeof Content>

const DialogContent = ({ className, children, ref, ...props }: DialogContentProps) => (
    <DialogPortal>
        <DialogOverlay />
        <Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                className
            )}
            {...props}
        >
            {children}
            <Close
                className="absolute right-4 top-4 rounded-sm
             !border-amber-200
             transition-colors duration-300 ease-in-out
             hover:!border-amber-700
             focus:outline-none focus:ring-0
             disabled:pointer-events-none bg-transparent focus-visible:outline-none focus-visible:ring-2"
            >
                <Cross2Icon className="size-4 " />
                <span className="sr-only">Close</span>
            </Close>
        </Content>
    </DialogPortal>
)
DialogContent.displayName = Content.displayName

type DivProps = ComponentProps<"div">

const DialogHeader = ({ className, ...props }: DivProps) => (
    <div
        className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }: DivProps) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)
DialogFooter.displayName = "DialogFooter"

type DialogTitleProps = ComponentPropsWithRef<typeof Title>

const DialogTitle = ({ className, ref, ...props }: DialogTitleProps) => (
    <Title
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
    />
)
DialogTitle.displayName = Title.displayName

type DialogDescriptionProps = ComponentPropsWithRef<typeof Description>

const DialogDescription = ({ className, ref, ...props }: DialogDescriptionProps) => (
    <Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
)
DialogDescription.displayName = Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
