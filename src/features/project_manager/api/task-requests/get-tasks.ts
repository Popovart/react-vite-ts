import { useQuery, queryOptions } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { type QueryConfig } from "@/lib/react-query"
import { type TaskDto } from "@/types/dto/task-dto"

export const getTasks = (projectId: string): Promise<TaskDto[]> => {
    return api.get(`/projects/${projectId}/tasks`);
}

export const getTasksQueryOptions = (projectId: string) => {
    return queryOptions({
        queryKey: ['projects/tasks', { projectId }],
        queryFn: () => getTasks(projectId),
    })
}

type UseTasksOptions = {
    projectId: string,
    queryConfig?: QueryConfig<typeof getTasksQueryOptions>
}

export const useTasks = ({
    projectId,
    queryConfig
}: UseTasksOptions) => {
    return useQuery({
        ...getTasksQueryOptions(projectId),
        ...queryConfig
    })
}



    

