import type { ReactNode } from "react"
import {
    useForm,
    type SubmitHandler,
    type FieldValues,
    type UseFormReturn,
    type UseFormProps,
    FormProvider,
} from "react-hook-form"
import { ZodType, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/utils/cn"

type FormProps<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Schema extends ZodType<any, any, any>,
    TFormValues extends FieldValues
> = {
    onSubmit: SubmitHandler<TFormValues>
    schema: Schema
    className?: string
    children: (methods: UseFormReturn<TFormValues>) => ReactNode
    options?: UseFormProps<TFormValues>
    id?: string
}

const Form = <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Schema extends ZodType<any, any, any>,
    TFormValues extends FieldValues = z.infer<Schema>
>({
    onSubmit,
    schema,
    className,
    children,
    options,
    id,
}: FormProps<Schema, TFormValues>) => {
    const methods = useForm<TFormValues>({
        ...(options as UseFormProps<TFormValues>),
        resolver: zodResolver(schema) as unknown as UseFormProps<TFormValues>["resolver"],
    })
    return (
        <FormProvider {...methods}>
            <form
                className={cn("space-y-6", className)}
                onSubmit={methods.handleSubmit(onSubmit)}
                id={id}
            >
                {children(methods)}
            </form>
        </FormProvider>
    )
}

export { Form }
