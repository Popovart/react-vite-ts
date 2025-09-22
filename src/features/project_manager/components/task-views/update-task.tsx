import { Pen } from "lucide-react"

import { Button } from "@/components/button"
import { Form, FormDrawer, Input, Textarea } from "@/components/form"
import { useNotifications } from "@/components/notifications"

import {
    updateTaskInputSchema,
    useUpdateTask,
} from "@project_manager/api/task-requests/update-task"

import { useTask } from "@project_manager/api/task-requests/get-task"

type UpdateTaskProps = {
    projectId: string
    taskId: string
}

export const UpdateTask = ({ projectId, taskId }: UpdateTaskProps) => {
    const { addNotification } = useNotifications()
    const taskQuery = useTask({ taskId })
    const updateTaskMutation = useUpdateTask({
        mutationConfig: {
            onSuccess: () => {
                addNotification({
                    type: "success",
                    title: "Task Updated",
                })
            },
        },
    })

    const task = taskQuery?.data

    return (
        <FormDrawer
            isDone={updateTaskMutation.isSuccess}
            triggerButton={<Button icon={<Pen className="size-4" />}>Update Task</Button>}
            title="Update Task"
            submitButton={
                <Button
                    form="update-task"
                    type="submit"
                    isLoading={updateTaskMutation.isPending}
                >
                    Submit
                </Button>
            }
        >
            <Form
                id="update-task"
                onSubmit={(values) => {
                    updateTaskMutation.mutate({
                        data: { ...values, projectId, id: taskId },
                    })
                }}
                options={{
                    defaultValues: {
                        code: task?.code ?? "",
                        description: task?.description ?? "",
                        deadline: task?.deadline ?? "",
                        place: task?.place ?? "",
                        urgency: task?.urgency ?? "",
                    },
                }}
                schema={updateTaskInputSchema}
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
