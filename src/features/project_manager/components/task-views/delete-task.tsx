import { useDeleteTask } from "@project_manager/api/task-requests/delete-task"
import { useNotifications } from "@/components/notifications"
import { ConfirmationDialog } from "@/components/dialog"
import { Button } from "@/components/button"
import { Trash } from "lucide-react"

type DeleteTaskProps = {
    taskId: string
    projectId: string
}

export const DeleteTask = ({
    taskId,
    projectId
}: DeleteTaskProps) => {
    const { addNotification } = useNotifications()
        const deleteTaskMutation = useDeleteTask({
            projectId,
            mutationConfig: { 
                onSuccess: () => {
                    addNotification({
                        type: "success",
                        title: "Task Deleted",
                    })
                },
            },
        })

    return (
        <ConfirmationDialog
            icon="danger"
            title="Delete Task"
            body="Are you sure you want to delete this task?"
            triggerButton={
                <Button variant="destructive" icon={<Trash className="size-4" />}>
                    Delete Task
                </Button>
            }
            confirmButton={
                <Button
                    isLoading={deleteTaskMutation.isPending}
                    type="button"
                    variant="destructive"
                    onClick={() => deleteTaskMutation.mutate({ taskId: taskId })}
                >
                    Delete Task
                </Button>
            }
        />
    )

    
}