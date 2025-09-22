import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import { api } from "@/lib/api-client"
import { type MutationConfig } from "@/lib/react-query"
import { getTasksQueryOptions } from "./get-tasks"
import { getTaskQueryOptions } from "./get-task"
import { type TaskDto } from "@/types/dto/task-dto"

export const updateTaskInputSchema = z.object({
    description: z.string().min(1, "Required").max(300, "Must be ≤ 300 chars"),
    code: z.string().min(1, "Required").max(50, "Required"),
    deadline: z.string().min(1, "Required").max(50, "Required"),
    urgency: z.string().min(1, "Required").max(50, "Required"),
    place: z.string().min(1, "Required").max(50, "Required"),
})

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema> & { projectId: string, id: string }

export const updateTask = ({
    data,
}: {
    data: UpdateTaskInput,
}): Promise<TaskDto> => {
    return api.patch(`/projects/tasks`, data)
}

type UseUpdateTaskOptions = {
    mutationConfig?: MutationConfig<typeof updateTask>
}

export const useUpdateTask = ({
    mutationConfig,
}: UseUpdateTaskOptions) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (data, variables, context) => {
            const projectIdForInvalidation = variables?.data?.projectId
            const taskIdForInvalidation = variables?.data?.id

            if (projectIdForInvalidation) {
                queryClient.invalidateQueries({
                    queryKey: getTasksQueryOptions(projectIdForInvalidation).queryKey,
                })
            }

            if (taskIdForInvalidation) {
                queryClient.invalidateQueries({
                    queryKey: getTaskQueryOptions(taskIdForInvalidation).queryKey,
                })
            }

            onSuccess?.(data, variables, context)
        },
        ...restConfig,
        mutationFn: updateTask,
    })
}
