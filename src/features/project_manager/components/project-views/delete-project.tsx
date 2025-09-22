import { Trash } from "lucide-react"
import { Button } from "@/components/button"
import { useNotifications } from "@/components/notifications"
import { useDeleteProject } from "@/features/project_manager/api/project-requests/delete-project"
import { ConfirmationDialog } from "@/components/dialog"

type DeleteProjectProps = {
    projectId: string
}

export const DeleteProject = ({ projectId }: DeleteProjectProps) => {
    const { addNotification } = useNotifications()
    const deleteProjectMutation = useDeleteProject({
        mutationConfig: {
            onSuccess: () => {
                addNotification({
                    type: "success",
                    title: "Project Deleted",
                })
            },
        },
    })

    return (
        <ConfirmationDialog
            icon="danger"
            title="Delete Project"
            body="Are you sure you want to delete this project?"
            triggerButton={
                <Button variant="destructive" icon={<Trash className="size-4 " />}>
                    Delete Project
                </Button>
            }
            confirmButton={
                <Button
                    isLoading={deleteProjectMutation.isPending}
                    type="button"
                    variant="destructive"
                    onClick={() => deleteProjectMutation.mutate({ projectId: projectId })}
                >
                    Delete Project
                </Button>
            }
        />
    )
}
