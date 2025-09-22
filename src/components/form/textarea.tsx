import { type UseFormRegisterReturn } from "react-hook-form"
import { type ComponentPropsWithRef } from "react"

import { cn } from "@/utils/cn"

import {
    FieldWrapper,
    type FieldWrapperPassThroughProps,
} from "@/components/form/field-wrapper"

type TextareaProps = ComponentPropsWithRef<"textarea"> &
    FieldWrapperPassThroughProps & {
        registration: Partial<UseFormRegisterReturn>
    }

const Textarea = ({
    className,
    label,
    error,
    registration,
    ref,
    ...props
}: TextareaProps) => {
    return (
        <FieldWrapper label={label} error={error}>
            <textarea
                className={cn(
                    "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...registration}
                {...props}
            />
        </FieldWrapper>
    )
}

Textarea.displayName = "Textarea"

export { Textarea }
