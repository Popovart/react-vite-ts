import {
    type FieldPath,
    type FieldValues,
    type ControllerProps,
    Controller,
    useFormContext,
} from "react-hook-form"
import { createContext, useContext, type ComponentPropsWithRef, useId } from "react"
import { cn } from "@/utils/cn"
import { Root } from "@radix-ui/react-label"
import { Label } from "@/components/form/label"
import { Slot } from "@radix-ui/react-slot"

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
}

// type Values = { title: string; body: string };

// good implementation (с TFieldValues)
// <FormField<Values, 'title'> name="title" />   // ✅
// <FormField<Values, 'notes'> name="notes" />   // ❌ error: 'notes' are not in Values

// bad variant with TName extends FieldPath<FieldValues> = FieldPath<FieldValues>
// <FormField name="notes" /> // no compiler won't throw error even though 'notes' are not in Values

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)
const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

const FormField = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

type FormItemContextValue = {
    id: string
}

const useFormField = () => {
    const fieldContext = useContext(FormFieldContext)
    const itemContext = useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>")
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}

type FormItemProps = ComponentPropsWithRef<"div">

const FormItem = ({ className, ref, ...props }: FormItemProps) => {
    const id = useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    )
}

FormItem.displayName = "FormItem"

type FormLabelProps = ComponentPropsWithRef<typeof Root>

const FormLabel = ({ className, ref, ...props }: FormLabelProps) => {
    const { error, formItemId } = useFormField()

    return (
        <Label
            ref={ref}
            className={cn(error && "text-destructive", className)}
            htmlFor={formItemId}
            {...props}
        />
    )
}

FormLabel.displayName = "FormLabel"

type FormControlProps = ComponentPropsWithRef<typeof Slot>

const FormControl = ({ ref, ...props }: FormControlProps) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    )
}
FormControl.displayName = "FormControl"

type FormDescriptionProps = ComponentPropsWithRef<"p">

const FormDescription = ({ className, ref, ...props }: FormDescriptionProps) => {
    const { formDescriptionId } = useFormField()

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn("text-[0.8rem] text-muted-foreground", className)}
            {...props}
        />
    )
}

FormDescription.displayName = "FormDescription"

type FormMessageProps = ComponentPropsWithRef<"p">

const FormMessage = ({ className, children, ref, ...props }: FormMessageProps) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
        return null
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            className={cn("text-[0.8rem] font-medium text-destructive", className)}
            {...props}
        >
            {body}
        </p>
    )
}

FormMessage.displayName = 'FormMessage';

export {
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};