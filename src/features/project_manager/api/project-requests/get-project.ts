import { useQuery, queryOptions } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import { type QueryConfig } from "@/lib/react-query"
import { type ProjectDto } from "@/types/dto/project-dto"

export const getProject = (projectId: string): Promise<ProjectDto> => {
    return api.get(`/projects/${projectId}`)
}

export const getProjectQueryOptions = (projectId: string) => {
    return queryOptions({
        queryKey: ["projects", projectId],
        queryFn: () => getProject(projectId),
    })
}

type UseProjectOptions = {
    projectId: string
    queryConfig?: QueryConfig<typeof getProjectQueryOptions>
}

export const useProject = ({
    projectId,
    queryConfig 
}: UseProjectOptions) => {
    return useQuery({
        ...getProjectQueryOptions(projectId),
        ...queryConfig,
    })
}
