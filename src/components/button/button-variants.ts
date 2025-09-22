import { cva } from "class-variance-authority"

const buttonVariants = cva(
    "inline-flex text-amber-950 items-center justify-center whitespace-nowrap rounded-md text-sm !bg-amber-200 hover:!border-amber-700 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "shadow-sm",
                destructive:
                    "shadow-sm",
                outline:
                    "shadow",
            },
            size: {
                default: "h-9 px-4 py-2 ",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export { buttonVariants }