import { Root, Trigger, Close, Portal, Overlay, Content, Title, Description } from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { type ComponentPropsWithRef, type HTMLAttributes } from "react"

const Drawer = Root

const DrawerTrigger = Trigger

const DrawerClose = Close

const DrawerPortal = Portal

type DrawerOverlayProps = ComponentPropsWithRef<typeof Overlay>

const DrawerOverlay = ({ className, ref, ...props }: DrawerOverlayProps) => (
    <Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            className
        )}
        {...props}
    />

)

DrawerOverlay.displayName = Overlay.displayName

const drawerVariants = cva(
    "fixed z-50 gap-4 bg-amber-100 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
    {
        variants: {
            side: {
                top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
                bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
                left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
                right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
                center:
                    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg border sm:rounded-lg data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            },
        },
        defaultVariants: {
            side: "center",
        },
    }
)

type DrawerContentProps = ComponentPropsWithRef<typeof Content> &
    VariantProps<typeof drawerVariants>

const DrawerContent = ({
    side = "center",
    className,
    children,
    ref,
    ...props
}: DrawerContentProps) => (
    <DrawerPortal>
        <DrawerOverlay />
        <Content ref={ref} className={cn(drawerVariants({ side }), className)} {...props}>
            {children}
            <Close className="absolute right-4 top-4 rounded-md text-sm  hover:!border-amber-700 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <Cross2Icon className="size-4" />
                <span className="sr-only">Close</span>
            </Close>
        </Content>
    </DrawerPortal>
)

type DivProps = HTMLAttributes<HTMLDivElement>

const DrawerHeader = ({ className, ...props }: DivProps) => (
    <div
        className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
        {...props}
    />
)

DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ className, ...props }: DivProps) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)

DrawerFooter.displayName = "DrawerFooter"

type DrawerTitleProps = ComponentPropsWithRef<typeof Title>

const DrawerTitle = ({
    className,
    ref,
    ...props
}: DrawerTitleProps) => (
    <Title ref={ref}  className={cn("text-lg font-semibold text-foreground", className)} {...props} />
)

DrawerTitle.displayName = Title.displayName

type DrawerDescriptionProps = ComponentPropsWithRef<typeof Description>

const DrawerDescription = ({
    className,
    ref,
    ...props
}: DrawerDescriptionProps) => (
    <Description  ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
)

DrawerDescription.displayName = Description.displayName;

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
  };