import { useQuery, queryOptions } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { type QueryConfig } from "@/lib/react-query"
import { type TaskDto } from "@/types/dto/task-dto"

export const getTask = (taskId: string): Promise<TaskDto> => {
    return api.get(`/projects/tasks/${taskId}`)
}

export const getTaskQueryOptions = (taskId: string) => {
    return queryOptions({
        queryKey: ["tasks", taskId],
        queryFn: () => getTask(taskId),
    })
}

type UseTaskOptions = {
    taskId: string
    queryConfig?: QueryConfig<typeof getTaskQueryOptions>
}

export const useTask = ({
    taskId,
    queryConfig 
}: UseTaskOptions) => {
    return useQuery({
        ...getTaskQueryOptions(taskId),
        ...queryConfig,
    })
}