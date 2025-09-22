import { type ComponentPropsWithRef } from "react"
import { cn } from "@/utils/cn"
import { FieldWrapper, type FieldWrapperPassThroughProps } from "@/components/form/field-wrapper"
import { type UseFormRegisterReturn } from 'react-hook-form';


export type InputProps = ComponentPropsWithRef<"input"> & FieldWrapperPassThroughProps & {
    registration: Partial<UseFormRegisterReturn>;
}

export const Input = ({
    className,
    type,
    label,
    error,
    registration,
    ref,
    ...props
}: InputProps) => (
    <FieldWrapper label={label} error={error}>
        <input
            type={type}
            className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...registration}
            {...props}
        />
    </FieldWrapper>
)
