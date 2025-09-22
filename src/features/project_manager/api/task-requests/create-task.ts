import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import { api } from "@/lib/api-client"
import { type MutationConfig } from "@/lib/react-query"
import { getTasksQueryOptions } from "./get-tasks"
import { type TaskDto } from "@/types/dto/task-dto"

export const createTaskInputSchema = z.object({
    description: z.string().min(1, "Required").max(50, "Required"),
    code: z.string().min(1, "Required").max(50, "Required"),
    deadline: z.string().min(1, "Required").max(50, "Required"),
    urgency: z.string().min(1, "Required").max(50, "Required"),
    place: z.string().min(1, "Required").max(50, "Required"),
})

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>

export const createTask = ({
    data,
}: {
    data: CreateTaskInput & { projectId: string }
}): Promise<TaskDto> => {
    return api.post(`/projects/tasks`, data)
}

type UseCreateTaskOptions = {
    projectId: string,
    mutationConfig?: MutationConfig<typeof createTask>
}

export const useCreateTask = ({
    projectId,
    mutationConfig,
}: UseCreateTaskOptions) => {
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
        mutationFn: createTask,
    })
}
