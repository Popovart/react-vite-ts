import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { type MutationConfig } from "@/lib/react-query"
import { getTasksQueryOptions } from "./get-tasks"

export const deleteTask = ({ taskId }: { taskId: string }) => {
    return api.delete(`/projects/tasks/${taskId}`)
}

type UseDeleteTaskOptions = {
	projectId: string,
    mutationConfig?: MutationConfig<typeof deleteTask>
}
export const useDeleteTask = ({
    projectId,
    mutationConfig,
}: UseDeleteTaskOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getTasksQueryOptions(projectId).queryKey,
            })
            onSuccess?.(...args)
        },
        ...restConfig,
        mutationFn: deleteTask,
    })
}
