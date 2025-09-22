import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { Spinner } from "../spinner"
import { buttonVariants } from "./button-variants"
import { type ComponentPropsWithRef } from "react"

export type ButtonProps = ComponentPropsWithRef<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
        isLoading?: boolean
        icon?: React.ReactNode
    }

const Button = ({
    className,
    variant,
    size,
    asChild = false,
    children,
    isLoading,
    icon,
    ref,
    ...props
}: ButtonProps) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        >
            {isLoading && <Spinner size="sm" className="text-current" />}
            {!isLoading && icon && <span className="mr-2 ">{icon}</span>}
            <span className="mx-2 sm:text-xl">{children}</span>
        </Comp>
    )
}

Button.displayName = "Button"

export { Button }
