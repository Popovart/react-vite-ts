import { cn } from "@/utils/cn"
import { cva } from 'class-variance-authority';
import { Root } from '@radix-ui/react-label';
import { type ComponentPropsWithRef } from "react"

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

type LabelProps = ComponentPropsWithRef<typeof Root>

export const Label = ({
    className,
    ref,
    ...props
}: LabelProps ) => (
    <Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    />
)

Label.displayName = Root.displayName;