import { Plus } from "lucide-react"
import { Button } from "@/components/button"
import { useNotifications } from "@/components/notifications"
import { Form, Input, FormDrawer, Textarea } from "@/components/form"
import {
    createTaskInputSchema,
    useCreateTask,
} from "@/features/project_manager/api/task-requests/create-task"

type CreateTaskProps = {
    projectId: string
}

export const CreateTask = ({ projectId }: CreateTaskProps) => {
    const { addNotification } = useNotifications()
    const createTaskMutation = useCreateTask({
        projectId,
        mutationConfig: {
            onSuccess: () => {
                addNotification({
                    type: "success",
                    title: "Task Created",
                })
            },
        },
    })

    return (
        <FormDrawer
            isDone={createTaskMutation.isSuccess}
            triggerButton={
                <Button icon={<Plus className="size-4" />}>Create Task</Button>
            }
            title="Create Task"
            submitButton={
                <Button
                    form="create-task"
                    type="submit"
                    isLoading={createTaskMutation.isPending}
                >
                    Submit
                </Button>
            }
        >
            <Form
                id="create-task"
                onSubmit={(values) => {
                    createTaskMutation.mutate({ data: { ...values, projectId } })
                }}
                schema={createTaskInputSchema}
            >
                {({ register, formState }) => (
                    <>
                        <Textarea
                            label="Description"
                            error={formState.errors["description"]}
                            registration={register("description")}
                        />

                        <Input
                            label="Code"
                            error={formState.errors["code"]}
                            registration={register("code")}
                        />
                        <Input
                            label="Deadline"
                            type = "datetime-local"
                            error={formState.errors["deadline"]}
                            registration={register("deadline")}
                        />
                        <Input
                            label="Urgency"
                            error={formState.errors["urgency"]}
                            registration={register("urgency")}
                        />
                        <Input
                            label="Place"
                            error={formState.errors["place"]}
                            registration={register("place")}
                        />
                    </>
                )}
            </Form>
        </FormDrawer>
    )
}
